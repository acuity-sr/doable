# doable

Extracts code-blocks from a markdown file.

An `MDX` equivalent for the shell. `MDSH` so to speak. The npm name was taken,
so we arrived at `doable`.

Inspired by [`codedown`](https://github.com/earldouglas/codedown). Allows using
a single markdown file to create a set of configuration artifacts and scripts.

Useful to document/explain complex configuration tasks, which involve
interacting with multiple different commands/shells/interfaces and might require
multiple configuration files.

Has cross-platform script-ability, allowing the generation of both `.bat` and
`.sh` files.

## The Rules:

1. Code blocks can have two kinds of annotations:
   - ``"```yaml"`` or ``"```bat"`` - which will result in an output file
     `${outDir}/run.${extension}`
   - ``"```yaml config.yaml"`` - which will result in an output filr
     `${outDir}/config.yml`
2. Any number of extensions and filePaths are possible.
3. No syntax validation of the output files is done.
4. A code-block without an annotation is encountered, it is assumed to belong to
   `run.sh` _and_ `run.bat`. But they have to be started before the first naked
   code-block. If neither `run.sh` nor `run.bat` is found, it'll be output to
   `stdout`.
5. Overwrites any generated files if they exist.
6. Adds a `#!/usr/bin/env sh` to `sh` files by default.

See [Example.md](./Example.md) for a sample

## Installation

> Currently, we install directly from the git-repo Need to establish ability to
> publish to open source.

#### node.js

```
npm install acuity-sr/doable
```

#### deno

```
deno install -A --unstable -root . https://raw.githubusercontent.com/acuity-sr/doable/main/cli_deno.ts
```

## Usage

#### node.js
```
npx doable inFile.md outDir
```

#### deno

```
deno run https://deno.land/x/doable/cli_deno.ts -A --unstable inFile.md outDir
```

### Example

#### node.js
```
npx doable Example.md ./out
```

#### deno
```
bin/doable Example.md ./out
```

