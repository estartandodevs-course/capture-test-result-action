const fs = require("fs");
const core = require('@actions/core');


try {
  const resultPath = core.getInput('resultPath');
  const jestOuputFile = fs.readFileSync(resultPath);
  const data = JSON.parse(jestOuputFile)
  core.setOutput("resultOfOutputTests", JSON.stringify(data));
} catch (error) {
  core.setFailed(error.message);
}