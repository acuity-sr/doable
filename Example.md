# Doable Example.md 
This file is both an example of the various possibilities and a test case for [`doable`](https://github.com/acuity-sr/doable)

In it's raw form: [Example.md](https://raw.githubusercontent.com/acuity-sr/doable/main/Example.md)

## Executing the example:

```
$ doable ./Example.md out
annotation '```': will be output to stdout, because neither run.bat nor run.sh have been started yet.


$
```
The various files generated are viewable at [`out`](https://github.com/acuity-sr/doable/tree/main/out)

## Example annotations

### Annotation ```
```
annotation '```': will be output to stdout, because neither run.bat nor run.sh have been started yet.
```

### Annotation ```bat
```bat
rem A batch file comment
echo "annotation: '```bat': creates ${outDir}/run.bat"
```
### Annotation ```sh
```sh
# Added to a bash script file called `run.sh` (first instance of `sh` flag)
echo "annotation: '```sh': creates ${outDir}/run.sh"
```

### Annotation ```bat my_script.bat
```bat my_script.bat
rem Creates `my_script.bat`
echo "annotation: '```bat my_script.bat': creates ${outDir}/my_script.bat"
```


### Annotation ```sh my_script .sh
```sh my_script .sh
# A bash comment
echo "annotation: '```sh my_script.sh': creates ${outDir}/my_script.sh"
```


The next section is the second un-annotated block, but it is appended to both
`run.sh` and `run.bat`.
Probably wise not to put shell specific lines in these blocks 
which get written as both .bat and .sh files.(comments, etc)

### Annotation ```
```
echo "annotation '```': this would go to both ${outDir}/run.sh and ${outDir}/run.bat"
```

### Annotation ```bat/sh
```bat/sh
echo "annotation '```bat/sh': appends to both ${outDir}/run.bat & ${outDir}/run.sh"
```

### Annotation ```sh/bat
```sh/bat
echo "annotation '```sh/bat': appends to both ${outDir}/run.sh & ${outDir}/run.bat"
```

### Annotation ```bat/sh my_script.sh
```bat/sh my_script.sh
echo "annotation '```bat/sh my_script': appends to both ${outDir}/my_script.bat & ${outDir}/my_script.sh"
```
### Annotation ```sh/bat my_script
```sh/bat my_script
echo "annotation '```sh/bat my_script': appends to both ${outDir}/my_script.sh & ${outDir}/my_script.bat"
```
### Annotation ```sh/bat my_script.bat
```sh/bat my_script.bat
echo "annotation '```sh/bat my_script.bat': appends to both ${outDir}/my_script.sh & ${outDir}/my_script.bat"
```

### Annotation ```null
```null
A `null` annotation. This block will not be added to any file 
    out
    ├── first.yml
    ├── run.bat
    ├── run.sh
    └── sub
        └── second.yaml
```

### Annotation ```bat
```bat
rem appends to `run.bat`
echo "annotation '```bat': appends to ${outDir}/run.bat"
```
### Annotation ```sh
```sh
# appends to `run.sh`
echo "annotation '```sh': appends to ${outDir}/run.sh"
```


But we can also create custom file destination(s) for various blocks by
attaching a filePath relative to outDir.

### Annotation ```yml first.yml
```yml first.yml
# annotation '```yaml first.yml': Creates `${outDir}/first.yml`
heading: this is the first yml file
sections:
  - one: one
```

Any number of destination files (and file formats) are possible "```yaml
second.yaml" Note that doable does not syntax validate any of the file formats.

### Annotation ```yaml sub/second.yaml
```yaml sub/second.yaml
# annotation '```yaml second.yaml': creates '${outDir}/sub/second.yaml'
heading: this is the second yaml file
sections:
  - A: a
```

### Annotation ```yml first.yml
```yml first.yml
  # annotation '```yml first.yml': appended to ${outDir}/first.yml
  - two: two
```

### Annotation ```yml sub\second.yaml
```yml sub\second.yaml
  # annotation '```yml first.yaml': appended to ${outDir}/sub/second.yaml
  - B: b
```

The idea is to create a single markdown file that provides a running commentary
to create a system that involves touching various tools.

`doable` is agnostic to the file extensions. Without a filePath for output,
it'll create a default `${outDir}/run.${extension}` file.
