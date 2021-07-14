# Doable Example.md

This is an example markdown file that can be processed by `doable`

We'd invoke `doable` like so: `doable ./example.md ./out`

```
This is a un-annotated code block, and will be output to stdout.
Because neither run.bat nor run.sh have been started yet.
```

```bat
rem Creates a batch file called `run.bat` (first instance of `bat` flag)
echo "first bat instance"
```

```sh
# Added to a bash script file called `run.sh` (first instance of `sh` flag)
echo "first sh instance"
```

The next section is the second un-annotated block, but it is appended to both
`run.sh` and `run.bat`.

```
echo "this would go to both files"
```

```bat
rem appends to `run.bat`
echo "appends to batch file"
```

```sh
# appends to `run.sh`
echo "appends to bash script"
```

But we can also create custom file destination(s) for various blocks by
attaching a filePath relative to outDir.

````yml first.yml
# This block has a "```yaml first.yml" tag
# Creates `${outDir}/first.yml`
heading: this is the first yml file
sections:
  - one: one
````

Any number of destination files (and file formats) are possible "```yaml
second.yaml" Note that doable does not syntax validate any of the file formats.

````yaml sub\second.yaml
# This block has a "```yaml second.yaml" tag
# Creates '${outDir}/second.yaml'
heading: this is the second yaml file
sections:
  - A: a
````

````yml first.yml
  # this block has a "```yml first.yml" tag
  # is appended to ${outDir}/first.yml
  - two: two
````

````yml sub\second.yaml
  # this block has a "```yaml second.yaml" tag
  # is appended to ${outDir}/second.yaml
  - B: b
````

The idea is to create a single markdown file that provides a running commentary
to create a system that involves touching various tools.

`doable` is agnostic to the file extensions. Without a filePath for output,
it'll create a default `${outDir}/run.${extension}` file.
