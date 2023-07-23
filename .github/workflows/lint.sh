#!/bin/bash
set -e
echo "Linting all Markdown content ..."
cd tools
npm ci
npm run lint