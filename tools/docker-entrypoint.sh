#!/bin/sh
set -eu

PREINSTALLED_NODE_MODULES=/opt/typescript-book-tools/node_modules
WORKSPACE_NODE_MODULES=/workspace/tools/node_modules

if [ -d /workspace/tools ] && [ -d "$WORKSPACE_NODE_MODULES" ]; then
    find "$PREINSTALLED_NODE_MODULES" -mindepth 1 -maxdepth 1 -exec ln -s {} "$WORKSPACE_NODE_MODULES" \;
fi

exec "$@"
