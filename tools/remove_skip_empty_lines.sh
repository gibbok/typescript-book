#!/bin/bash

# This script removes empty lines after <!-- skip --> comments in a markdown file.

TARGET_FILE="${1:-README-it_IT.md}"

# Remove empty lines after <!-- skip --> comments
sed -i '' '/<!-- skip -->/{N;s/<!-- skip -->\n$/<!-- skip -->/;}' "$TARGET_FILE"

echo "Empty lines after <!-- skip --> comments have been removed from $TARGET_FILE."
