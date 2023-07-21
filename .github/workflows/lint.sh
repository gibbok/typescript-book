#!/bin/bash
echo "Linting snippets..."
cd tools
npm ci
npm run lint