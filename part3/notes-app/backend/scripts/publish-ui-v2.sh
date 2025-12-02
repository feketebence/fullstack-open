#!/usr/bin/env bash
set -euo pipefail

# Configuration
DIST_DIR="${DIST_DIR:-dist}"
DRY_RUN="${DRY_RUN:-false}"
FORCE_PUSH="${FORCE_PUSH:-false}"
COMMIT_PREFIX="${COMMIT_PREFIX:-ui-build}"

# Color output (disabled in CI)
if [ -t 1 ] && [ "${CI:-false}" != "true" ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    NC='\033[0m'
else
    RED='' GREEN='' YELLOW='' NC=''
fi

log() {
    echo -e "${GREEN}[INFO]${NC}  $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC}  $1" >&2
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    exit 1
}

# Enhanced error trap with context
trap 'err=$?; \
      [ $err -eq 0 ] && exit 0; \
      echo >&2 ""; \
      echo >&2 "==================== ERROR ==================="; \
      echo >&2 "Failed at line: $LINENO"; \
      echo >&2 "Exit code: $err"; \
      echo >&2 "Command: $BASH_COMMAND"; \
      echo >&2 "Working directory: $(pwd)"; \
      echo >&2 "Git status:"; \
      git status --short 2>&1 | head -20 | sed "s/^/  /" >&2; \
      echo >&2 "=============================================="; \
      exit $err' ERR EXIT

# --- Preconditions -----------------------------------------------------------

log "Starting deployment script (DRY_RUN=$DRY_RUN)"

# Git repository check
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    error "Must be run inside a Git repository"
fi

# Working directory must be clean (except for DIST_DIR)
untracked_outside=$(git ls-files --others --exclude-standard | grep -v "^${DIST_DIR}/" || true)
modified_outside=$(git ls-files --modified | grep -v "^${DIST_DIR}/" || true)

if [ -n "$untracked_outside" ] || [ -n "$modified_outside" ]; then
    warn "Working directory has changes outside '$DIST_DIR':"
    [ -n "$untracked_outside" ] && echo "$untracked_outside" | sed 's/^/    /'
    [ -n "$modified_outside" ] && echo "$modified_outside" | sed 's/^/    /'
    error "Commit or stash changes before running this script"
fi

# Target directory check
if [ ! -d "$DIST_DIR" ]; then
    error "Directory '$DIST_DIR' does not exist. Build step may have failed."
fi

# Remote check
if ! git remote get-url origin >/dev/null 2>&1; then
    error "No 'origin' remote configured"
fi

# Upstream branch check
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
    error "Branch '$CURRENT_BRANCH' has no upstream. Set with: git branch --set-upstream-to=origin/$CURRENT_BRANCH"
fi

# --- Check for changes ---

log "Checking for changes in '$DIST_DIR'..."

# Single file collection with proper null-delimiter handling
mapfile -d '' changed_files < <(git ls-files -z --others --modified --exclude-standard -- "$DIST_DIR")

if [ "${#changed_files[@]}" -eq 0 ]; then
    log "No changes detected in '$DIST_DIR'. Nothing to deploy."
    exit 0
fi

log "Found ${#changed_files[@]} changed file(s):"
printf '    %s\n' "${changed_files[@]}" | head -20
[ "${#changed_files[@]}" -gt 20 ] && echo "    ... and $((${#changed_files[@]} - 20)) more"
echo

# --- Stage changes ---

log "Staging changes..."

if [ "$DRY_RUN" = "true" ]; then
    log "[DRY RUN] Would stage ${#changed_files[@]} files"
else
    # Stage all at once - more efficient and atomic
    if ! git add -- "$DIST_DIR"; then
        error "Failed to stage files in '$DIST_DIR'"
    fi
    
    # Verify staging worked
    staged_count=$(git diff --cached --numstat | wc -l)
    if [ "$staged_count" -eq 0 ]; then
        error "Staging appeared to succeed but no files in staging area"
    fi
    
    log "Staged $staged_count change(s)"
fi

# --- Pre-push sync check ---

log "Verifying sync with remote..."

# Fetch latest to ensure we have current remote state
if ! git fetch origin "$CURRENT_BRANCH" 2>/dev/null; then
    warn "Could not fetch latest from origin. Continuing with local state."
fi

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse @{u} 2>/dev/null || echo "unknown")

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ] && [ "$FORCE_PUSH" != "true" ]; then
    error "Local branch is not in sync with remote.
    Local:  $LOCAL_HASH
    Remote: $REMOTE_HASH
    
    Pull latest changes or set FORCE_PUSH=true to override."
fi

# --- Commit ---

COMMIT_MSG="${COMMIT_PREFIX}-$(date -u +%Y-%m-%dT%H-%M-%SZ)"
COMMIT_HASH=""

if [ "$DRY_RUN" = "true" ]; then
    log "[DRY RUN] Would commit with message: '$COMMIT_MSG'"
else
    log "Creating commit..."
    
    if ! git commit -m "$COMMIT_MSG" -m "Automated deployment from CI/CD pipeline" --quiet; then
        error "Commit failed"
    fi
    
    COMMIT_HASH=$(git rev-parse HEAD)
    log "Created commit: $COMMIT_HASH"
    log "Message: $COMMIT_MSG"
fi

echo

# --- Push ---

log "Pushing to origin/$CURRENT_BRANCH..."

if [ "$DRY_RUN" = "true" ]; then
    log "[DRY RUN] Would push commit to origin"
else
    # Use --force-with-lease for safety - only force if remote hasn't changed
    PUSH_ARGS=(origin HEAD)
    if [ "$FORCE_PUSH" = "true" ]; then
        warn "Using --force-with-lease for push"
        PUSH_ARGS+=(--force-with-lease)
    fi
    
    if ! git push "${PUSH_ARGS[@]}"; then
        error "Push failed. You may need to pull latest changes and retry.
        
        To rollback local commit:
            git reset --soft HEAD~1"
    fi
    
    log "Successfully pushed commit $COMMIT_HASH"
fi

# --- Summary ---

echo
log "=========================================="
log "Deployment complete!"
log "Branch:  $CURRENT_BRANCH"
[ -n "$COMMIT_HASH" ] && log "Commit:  $COMMIT_HASH"
log "Files:   ${#changed_files[@]}"
log "=========================================="
