const { cpSync, mkdirSync } = require("fs");
const { join } = require("path");

const source = join(__dirname, "..", "src", "assets");
const target = join(__dirname, "..", "lib", "assets");

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });
