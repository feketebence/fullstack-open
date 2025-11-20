#!/bin/bash

DIST_DIR="dist"

changes_to_add=$(git ls-files --others --modified --exclude-standard "$DIST_DIR")

if [ -n "$changes_to_add" ]; then
    echo "Files \"git add\" will stage from '$DIST_DIR' directory:" 
    
    changed_file_count=0
    while IFS= read -r changed_file; do
        echo "    $changed_file"
        git add "$changed_file"

        ((changed_file_count++))
    done <<< "$changes_to_add"

    echo "Staged $changed_file_count files..."
    echo

    staged_changes=$(git diff --name-only --cached)

    echo "Staged changes in the following files:"
    while IFS= read -r staged_change; do
        echo "    $staged_change"

    done <<< "$staged_changes"
    echo

    commit_message="ui-build-$(date --utc +%Y-%m-%dT%H-%M-%SZ)"
    git commit -m "$commit_message"
    echo "Committed $changed_file_count changes with commit message: '$commit_message'"

    git push
    echo "Pushed $changed_file_count changes"

else
    echo "No files to stage."
fi