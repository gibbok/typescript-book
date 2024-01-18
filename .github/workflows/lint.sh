#!/bin/bash
set -e
echo "Linting Markdown and Code files ..."
cd tools
npm ci
npm run lint
npm run lint:md
npm run format