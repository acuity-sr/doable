#!/usr/bin/env sh
echo "annotation '```bat/sh my_script': appends to both ${outDir}/my_script.bat & ${outDir}/my_script.sh"


echo "annotation '```sh/bat my_script': appends to both ${outDir}/my_script.sh & ${outDir}/my_script.bat"


echo "annotation '```sh/bat my_script.bat': appends to both ${outDir}/my_script.sh & ${outDir}/my_script.bat"

