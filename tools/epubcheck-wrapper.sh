#!/bin/sh
set -eu

exec java -Dxml.catalog.cache=/tmp/.cache/xmlresolver \
    -jar /opt/epubcheck/epubcheck.jar "$@"
