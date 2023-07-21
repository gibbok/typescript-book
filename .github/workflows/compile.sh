#!/bin/bash
echo "Compile snippets..."
cd tools
npm ci
npm run compile