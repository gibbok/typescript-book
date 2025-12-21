#!/bin/bash

# Remove empty lines after <!-- skip --> comments
sed -i '' '/<!-- skip -->/{N;s/<!-- skip -->\n$/<!-- skip -->/;}' README-it_IT.md

echo "Empty lines after <!-- skip --> comments have been removed."