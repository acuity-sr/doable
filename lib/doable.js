

let _debug = false;
const trace = (msg) => {
    if (_debug) {
        console.log(msg)
    }
}

export default function main(fs, marked, args, debug = false) {
    _debug = debug;
    if (!args.length) {
        return usage("missing <inFile>");
    }
    trace({ args });
    const parsed = processArgs(args);
    if (parsed) {
        const { inFile, outDir } = parsed;
        trace({ inFile, outDir })
        const mdContents = fs.readTextFile(inFile);
        // we can actually do the work here.
        const { stdout, ...output } = doable(marked, mdContents);
        const created = [];
        if (stdout || output) {
            Object.entries(output).forEach(([fname, contents]) => {
                if (fname.match(/\.sh$/)) {
                    contents.unshift(`#!/usr/bin/env sh`)
                }
                contents = contents.flat().join("\n");
                const fPath = `${outDir}/${fname}`.replace(/\\+/, '/'); // replace back-slashes
                const dir = fPath.split('/').slice(0, -1).join('/');
                if (dir) {
                    fs.mkdirp(dir);
                }
                fs.writeTextFile(fPath, contents);
                created.push(fname);
                trace(`=====\nFILE: ${fname}:\n-----\n${contents}`)
            })
            if (stdout) {
                console.log(stdout.flat().join("\n"))
            } else {
                console.log(`\n\n${created.join("\n")}`)
            }
            return;
        } else {
            return usage(`WARNING: No code blocks detected\n`)
        }
    }
    return usage();
}


function doable(marked, mdContents) {
    var renderer = new marked.Renderer();

    // initialize any existing renderers. Is this necessary?
    var renderers =
        Object.getOwnPropertyNames(marked.Renderer.prototype);
    for (let i = 0; i < renderers.length; i++) {
        const f = renderers[i];
        if (f !== 'constructor') {
            renderer[renderers[i]] = function () { return ''; };
        }
    }

    const collections = {};

    renderer.code = (src, blockAnnotation, _escaped) => {
        trace(` Detected Block: ${blockAnnotation}`);
        const [lang, fname] = `${blockAnnotation}`.split(" ");
        src = src.replace(/\r\n/g, "\n").split("\n");
        src.push("\n"); // add an extra newline for each block 
        // since we might be generating executable files with varied commenting schemes,
        // we use only an extra newline to create a visual segment marker in the output
        if (fname) {
            collections[fname] = collections[fname] ?? [];
            collections[fname].push(src);
        } else if (lang) {
            collections[`run.${lang}`] = collections[`run.${lang}`] ?? [];
            collections[`run.${lang}`].push(src);
        } else {
            // default code-block
            switch (true) {
                case (!!collections?.['run.sh']): {
                    collections['run.sh'].push(src)
                }
                /* falls through */
                case (!!collections?.['run.bat']): {
                    collections['run.bat'].push(src)
                    break;
                }
                default: {
                    collections.stdout = collections.stdout || [];
                    collections.stdout.push(src);
                }
            }
        }
        return src;
    };

    renderer.listitem = (text) => { return text; };
    renderer.list = (body, _ordered) => { return body; };

    marked.use({ renderer: renderer });

    marked(mdContents);

    return collections;
}


function usage(warning) {
    if (warning) {
        console.log(`${warning}\n`);
    }
    console.log([
        `Usage: doable <inFile> [outDir]`,
        `  inFile   a markdown file with code-block annotations`,
        `  outDir   output directory, relative to 'cwd'`
    ].join("\n"))
}

function processArgs(_args) {
    const { args, ...flags } = parseArgs(_args);
    const inFile = args?.[0];
    const outDir = args?.[1] ?? '.';
    return (0 === _args.length || !inFile || flags?.h || flags?.help)
        ? null
        : { inFile, outDir }
}

function parseArgs(args = []) {
    const { parsed } = [...args].reduce((acc, arg, idx) => {
        const addFlag = () => {
            if (0 < acc.curr.length) {
                const flag = acc.curr[0].replace(/^-*/, '');
                acc.parsed[flag] = acc.curr.slice(1);
            }
            return acc;
        }
        if (arg.match(/^-/)) {
            if (acc.curr.length) {
                acc = addFlag(arg); // finish processing previous flag
            }
            acc.curr = [arg]; // start new flag
        } else if (acc.curr.length) {
            acc.curr.push(args); // continue processing previous flag
        } else {
            acc.parsed.args.push(arg); // command parameter - not associated with any flag
        }
        if (idx === args.length - 1 && acc.curr.length) {
            // end of arg list. Wind up any trailing flags before exit
            acc = addFlag(arg);
            acc.curr = [];
        }
        return acc;
    }, {
        parsed: {
            args: []
        }, curr: []
    })
    return parsed;
}