# doable

Extracts code-blocks from a markdown file.

An `MDX` equivalent for the shell. `MDSH` so to speak. The npm name was taken,
so we arrived at `doable`.

Inspired by [`codedown`](https://github.com/earldouglas/codedown). Allows using
a single markdown file to create a set of configuration artifacts and scripts.

Useful to document/explain complex configuration tasks, which involve
interacting with multiple different commands/shells/interfaces and might require
creation of multiple configuration files.

Has cross-platform script-ability, allowing the generation of both `.bat` and
`.sh` files.

Currently, only supports operating on a single `.md` file. Please use a script to 
sequentially process multiple files in any desired order.

## The Rules:

1. Code blocks can have three kinds of annotations:
     a. ` "```" ` - no annotation, output to stdout
     b. ` "```lang"` - block is ignored. Allows using IDE formatting (diff, code)
     c. ` "```lang path/file"` - output creates or appends to path/file
2. When `path/file` is encountered for the FIRST time, 
     a. `path/file`: creates/overwrites file on disk
     b. `+path/file`: appends-to/creates file on disk
3. If `path/file` is repeated, the blocks are concatenated, in order of appearance.
4. No inherent limit on the number of unique annotations or repetitions
5. `"```bat/sh path/file"` or `"```sh/bat path/file"` adds a script to both `path/file.sh` and `path/file.bat`.
7. File output is not sanitized, or otherwise validated.
8. Adds a `#!/usr/bin/env sh` to `sh` files by default.


For details, see 
- [Example.md](https://github.com/acuity-sr/doable/blob/main/Example.md) 
- [Example.md in it's raw form](https://raw.githubusercontent.com/acuity-sr/doable/main/Example.md) 

## Installation

> Currently, we install directly from the git-repo Need to establish ability to
> publish to open source.

#### node.js

```
npm install acuity-sr/doable
```

#### deno

```
deno install -A --unstable -root . -n doable https://raw.githubusercontent.com/acuity-sr/doable/main/cli_deno.ts
```

## Usage

#### node.js

```
npx doable inFile.md outDir
```

#### deno

```
deno run -A --unstable https://raw.githubusercontent.com/acuity-sr/doable/main/cli_deno.ts inFile.md outDir
```

```
./bin/doable inFile.md outDir
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
