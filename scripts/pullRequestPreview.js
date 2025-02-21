import { execSync } from "child_process";
import { Octokit } from "@octokit/core";

console.log("[DEPLOY_PREVIEW]: START");
const command = "yarn deploy:staging";
const output = execSync(command, { encoding: "utf8" });
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploy preview on: ${DEPLOY_URL}`);

// GitHub Pull Request Comment
console.log("[GITHUB_COMMENT]: START");
const { GITHUB_OWNER, GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_PR_NUMBER } =
  process.env;
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`;

const GITHUB_REPO = GITHUB_REPOSITORY.split("/").pop();

console.log("GITHUB_OWNER", GITHUB_OWNER);
console.log("GITHUB_REPOSITORY", GITHUB_REPO);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

(async () => {
  try {
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        issue_number: GITHUB_PR_NUMBER,
        body: GH_COMMENT,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
  } catch (error) {
    console.log("[COMMENT_ON_GITHUB: ERROR]");
    throw new Error(error);
  } finally {
    console.log("[COMMENT_ON_GITHUB: END]");
  }
})();
