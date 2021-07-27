#!/usr/bin/env node
import marked from "marked";
import fs_ from "fs";
import doable from "./lib/doable.js";
const args = [...process.argv].slice(1);

const fs = {
  readTextFile: (fname) => fs_.readFileSync(fname, "utf8"),
  writeTextFile: (fname, contents) =>
    fs_.writeFileSync(fname, contents, "utf8"),
  mkdirp: (dir) => fs_.mkdirSync(dir, { recursive: true }),
};

try {
  doable(fs, marked, [...args].slice(1), !!process.env.DOABLE_TRACE);
} catch (err) {
  console.error(err.message);
}
