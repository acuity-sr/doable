rem A batch file comment
echo "annotation: '```bat': creates ${outDir}/run.bat"


echo "annotation '```': this would go to both ${outDir}/run.sh and ${outDir}/run.bat"


echo "annotation '```bat/sh': appends to both ${outDir}/run.bat & ${outDir}/run.sh"


echo "annotation '```sh/bat': appends to both ${outDir}/run.sh & ${outDir}/run.bat"


rem appends to `run.bat`
echo "annotation '```bat': appends to ${outDir}/run.bat"

