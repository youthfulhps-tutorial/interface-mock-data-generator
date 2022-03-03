const execSync = require("child_process").execSync;
const fs = require("fs");

const args = process.argv;

const dir = args
  .filter((arg) => arg.match(new RegExp("--dir=")))[0]
  .split("=")[1];

const target = args
  .filter((arg) => arg.match(new RegExp("--target=")))[0]
  .split("=")[1];

execSync(
  `node ./node_modules/intermock/build/src/cli/index.js --files ./types/${dir}.ts --interfaces \"${target}\" > raw.txt`
);

const rawMockData = fs.readFileSync("raw.txt", "utf8");
const dataToSingleLine = rawMockData.replace(/(\r\n|\n|\r|\s)/gm, "");
const mockData = dataToSingleLine.slice(1, -1).replace(":", "=");

const result = `export const mock${mockData}`;

fs.writeFileSync(`mocks/${target}.ts`, result, "utf8");

fs.unlinkSync("raw.txt");

execSync(`yarn prettier --write ./mocks/${target}.ts`);
