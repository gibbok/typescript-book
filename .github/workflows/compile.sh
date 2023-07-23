#!/bin/bash
set -e
echo "Compiling all code snippets ..."
cd tools
npm ci
npm run compile