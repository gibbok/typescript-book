#!/bin/sh
set -eu

exec java -jar /usr/share/java/epubcheck.jar "$@"
