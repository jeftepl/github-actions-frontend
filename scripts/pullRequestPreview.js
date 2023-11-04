const { execSync } = require("child_process");

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf8" });
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploy preview on: ${DEPLOY_URL}`);

// GitHub

console.log("[GITHUB_COMMENT]: START");
const { GITHUB_OWNER, GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_PR_NUMBER } =
  process.env;
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`;

const defaultHeaders = {};
defaultHeaders["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
defaultHeaders["Accept"] = "application/vnd.github+json";
defaultHeaders["Content-Type"] = "application/json";

console.log("GITHUB_OWNER", GITHUB_OWNER);
console.log("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);

fetch(
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/issues/${GITHUB_PR_NUMBER}/comments`,
  {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      body: GH_COMMENT,
    }),
  },
)
  .then(async (response) => {
    if (response.ok) return response.json();
    const text = await response.text();
    throw new Error(text);
  })
  .catch((err) => {
    console.log("[COMMENT_ON_GITHUB: ERROR]");
    throw new Error(err);
  })
  .finally(() => {
    console.log("[COMMENT_ON_GITHUB: END]");
  });
