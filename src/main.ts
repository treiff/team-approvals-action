import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });

    const prNumber = getPrNumber();
    if (!prNumber) {
      console.log('Could not get pull request number from context, exiting');
      return;
    }

    const client = new github.GitHub(token);

    core.debug(`fetching info for pr #${prNumber}`);
    const prInfo = await getPrInfo(client, prNumber);
    console.log(prInfo);
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

async function getPrInfo(client: github.GitHub, prNumber: number): Promise<any> {
  const prResponse = await client.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber,
  });

  return prResponse.data;
}

run();
