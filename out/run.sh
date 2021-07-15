#!/usr/bin/env sh
# Added to a bash script file called `run.sh` (first instance of `sh` flag)
echo "annotation: '```sh': creates ${outDir}/run.sh"


echo "annotation '```': this would go to both ${outDir}/run.sh and ${outDir}/run.bat"


echo "annotation '```bat/sh': appends to both ${outDir}/run.bat & ${outDir}/run.sh"


echo "annotation '```sh/bat': appends to both ${outDir}/run.sh & ${outDir}/run.bat"


# appends to `run.sh`
echo "annotation '```sh': appends to ${outDir}/run.sh"

