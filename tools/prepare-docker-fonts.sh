#!/bin/sh
set -eu

target_dir=${1:?font staging directory is required}
mkdir -p "$target_dir"

if [ "$(uname -s)" != "Darwin" ]; then
	 exit 0
fi

for font in \
	"/System/Library/Fonts/Menlo.ttc" \
	"/System/Library/Fonts/Apple Symbols.ttf" \
	"/System/Library/Fonts/Apple Color Emoji.ttc" \
	"/System/Library/Fonts/Supplemental/Georgia.ttf" \
	"/System/Library/Fonts/Supplemental/Georgia Bold.ttf" \
	"/System/Library/Fonts/Supplemental/Georgia Italic.ttf" \
	"/System/Library/Fonts/Supplemental/Georgia Bold Italic.ttf" \
	"/System/Library/Fonts/Supplemental/Verdana.ttf" \
	"/System/Library/Fonts/Supplemental/Verdana Bold.ttf" \
	"/System/Library/Fonts/Supplemental/Verdana Italic.ttf" \
	"/System/Library/Fonts/Supplemental/Verdana Bold Italic.ttf" \
	"/System/Library/Fonts/Supplemental/Times New Roman.ttf" \
	"/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf" \
	"/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf" \
	"/System/Library/Fonts/Supplemental/Times New Roman Bold Italic.ttf"
do
	if [ -f "$font" ]; then
		cp -f "$font" "$target_dir/"
	fi
done
