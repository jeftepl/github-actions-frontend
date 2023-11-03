const { execSync } = require("child_process");
const { readFileSync } = require("fs");

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf-8" });
const outputLines = output.split("/n");
console.log("outputLines: ", outputLines);
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const projectName = packageJson.name;
/* const DEPLOY_URL = outputLines.find(
  (line) => line.includes("https://") && line.includes(projectName),
); */
const DEPLOY_URL = outputLines
  .filter((line) => line.includes("https://"))
  .pop();
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploy preview on: ${DEPLOY_URL}`);

/* console.log("[GITHUB_COMMENT]: START");
console.log("[GITHUB_COMMENT]: END"); */
