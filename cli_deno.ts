import { fs as fs_, marked } from "./deps.js";
import doable from "./lib/doable.js";

const fs = {
  readTextFile: (fPath: string) => fs_.readFileSync(fPath, "utf8"),
  writeTextFile: (fPath: string, contents: string) =>
    fs_.writeFileSync(fPath, contents, "utf8"),
  mkdirp: (dir: string) => fs_.mkdirSync(dir, { recursive: true }),
};
doable(fs, marked, [...Deno.args], !!Deno.env.get("DOABLE_TRACE"));
