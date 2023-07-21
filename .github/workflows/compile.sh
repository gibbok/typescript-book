#!/bin/bash
echo "Compiling snippets ..."
cd tools
npm ci
npm run compile