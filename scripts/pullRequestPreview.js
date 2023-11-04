const { execSync } = require("child_process");
const { Octokit } = require("@octokit/core");

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf8" });
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploy preview on: ${DEPLOY_URL}`);

// GitHub Comment

console.log("[GITHUB_COMMENT]: START");
const { GITHUB_OWNER, GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_PR_NUMBER } =
  process.env;
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`;

console.log("GITHUB_OWNER", GITHUB_OWNER);
console.log("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);

/*
const headers = {};
headers["Accept"] = "application/vnd.github+json";
headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
headers["X-GitHub-Api-Version"] = "2022-11-28";
headers["Content-Type"] = "application/json";
const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/pulls/${GITHUB_PR_NUMBER}/comments`;
const body = JSON.stringify({
  body: GH_COMMENT,
});

fetch(url, {
  method: "POST",
  headers,
  body,
})
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
 */

// Octokit.js
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function postComment() {
  try {
    const response = await octokit.request(
      `POST /repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/issues/${GITHUB_PR_NUMBER}/comments`,
      {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPOSITORY,
        issue_number: GITHUB_PR_NUMBER,
        body: GH_COMMENT,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    console.log("response", response);
  } catch (error) {
    console.error(error);
  }
}

postComment();
