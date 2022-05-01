const fs = require("fs");
const core = require('@actions/core');
const jestOuputFile = fs.readFileSync("./result.json");
const data = JSON.parse(jestOuputFile)

try {
  core.setOutput("resultOfOutputTests", JSON.stringify(data));
} catch (error) {
  core.setFailed(error.message);
}