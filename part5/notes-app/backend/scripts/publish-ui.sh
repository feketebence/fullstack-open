#!/usr/bin/env bash
set -euo pipefail

# Capture the last command and its exit code
trap 'err=$?; \
      echo >&2 ""; \
      echo >&2 "================= ERROR DEBUG INFO ================="; \
      echo >&2 "Script failed at line: $LINENO"; \
      echo >&2 "Exit code: $err"; \
      echo >&2 "Command: $BASH_COMMAND"; \
      echo >&2 "Current file being processed: ${file:-<none>}"; \
      echo >&2 "====================================================="; \
      exit $err' ERR


DIST_DIR="dist"

log() {
    echo -e "[INFO]  $1"
}

error() {
    echo -e "[ERROR] $1" >&2
    exit 1
}

# --- Preconditions -----------------------------------------------------------

# Must be run inside a Git repo
git rev-parse --is-inside-work-tree > /dev/null 2>&1 \
  || error "This script must be run inside a Git repository."

# Ensure target directory (with the built artifacts) exists
if [ ! -d "$DIST_DIR" ]; then
    error "Directory '$DIST_DIR' does not exist. Did the UI build step fail?"
fi

# Ensure remote exists (avoid push failure later)
if ! git remote get-url origin > /dev/null 2>&1; then
    error "No 'origin' remote found. Cannot push."
fi

# Ensure local and remote repository are in sync
LOCAL_HASH=$(git rev-parse HEAD)       || error "Failed to read local HEAD"
REMOTE_HASH=$(git rev-parse @{u})      || error "Failed to read remote HEAD"

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
    error "Local and remote are out of sync. 
    Local hash: $LOCAL_HASH 
    Remote hash: $REMOTE_HASH 
    
    Synchronize your local repository with remote before publishing UI build."
fi

# Ensure HEAD has an upstream branch
if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
    error "Current branch has no upstream. Cannot determine whether commits are safe to push."
fi

# --- Check for changes in target directory ---
changes_to_add=$(git ls-files -z --others --modified --exclude-standard "$DIST_DIR" || true)

if [ -z "$changes_to_add" ]; then
    log "No files to stage in target directory: '$DIST_DIR'. Exiting."
    exit 0
fi

log "Files to stage from '$DIST_DIR':"
echo "$changes_to_add" | sed 's/^/    /'


# --- Staging (robust, NUL-safe, keeps going on per-file failures) ---
changed_file_count=0
failed_files=()

# Use -z to produce NUL-delimited output and read with -d '' so filenames
# containing newlines or spaces are handled correctly. Use process substitution
# instead of storing the list in a variable.
while IFS= read -r -d '' file; do
    # defensive skip empty entries (shouldn't happen with -z, but safe)
    [ -z "$file" ] && continue

    log "Staging: $file"

    if git add -- "$file"; then
        changed_file_count=$((changed_file_count + 1))
        log "Added: $file"
    else
        # record but don't exit immediately
        echo "[WARN] Failed to stage: $file" >&2
        failed_files+=("$file")
    fi
done < <(git ls-files -z --others --modified --exclude-standard -- "$DIST_DIR")

if [ "${#failed_files[@]}" -ne 0 ]; then
    echo >&2
    echo "[ERROR] One or more files failed to stage:" >&2
    for f in "${failed_files[@]}"; do
        echo "    $f" >&2
    done
    error "Aborting because git add failed for some files."
fi

log "Staged $changed_file_count files."
echo


# --- Verify staged changes ---
staged_changes=$(git diff --name-only --cached || error "Failed to use git diff --cached")

if [ -z "$staged_changes" ]; then
    error "Files were staged earlier, but nothing appears in the staging area. Aborting."
fi

log "Staged changes:"
echo "$staged_changes" | sed 's/^/    /'
echo


# --- Commit ---
commit_message="ui-build-$(date --utc +%Y-%m-%dT%H-%M-%SZ)"

log "Committing changes..."
git commit -m "$commit_message" || error "git commit failed."

SCRIPT_COMMIT_HASH=$(git rev-parse HEAD)
log "Committed $changed_file_count changes with message: '$commit_message'"
log "Commit hash: $SCRIPT_COMMIT_HASH"
echo


# --- Push ---
log "Pushing to origin..."
git push origin HEAD \
  || error "git push failed."

log "Pushed $changed_file_count changes successfully."
