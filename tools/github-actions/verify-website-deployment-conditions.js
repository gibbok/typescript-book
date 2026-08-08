module.exports = async ({ github, context, core }) => {
  const pullRequest = context.payload.pull_request;
  const files = await github.paginate(github.rest.pulls.listFiles, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullRequest.number,
    per_page: 100,
  });
  const websiteChanged = files.some(({ filename }) => filename.startsWith('website/'));

  const reviews = await github.paginate(github.rest.pulls.listReviews, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullRequest.number,
    per_page: 100,
  });
  const latestReviewByUser = new Map();
  for (const review of reviews
    .filter(({ user, submitted_at }) => user && submitted_at)
    .sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at))) {
    latestReviewByUser.set(review.user.login, review.state);
  }
  const approved = [...latestReviewByUser.values()].includes('APPROVED');

  const latestRun = async (workflowId) => {
    const runs = await github.paginate(github.rest.actions.listWorkflowRuns, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      event: 'pull_request',
      head_sha: pullRequest.head.sha,
      per_page: 100,
    });
    return runs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
  };
  const latestValidationRun = await latestRun('validate-content.yml');
  const validationPassed = latestValidationRun?.status === 'completed' &&
    latestValidationRun.conclusion === 'success';

  const latestE2ERun = await latestRun('website-e2e.yml');
  const e2ePassed = latestE2ERun?.status === 'completed' &&
    latestE2ERun.conclusion === 'success';

  core.info(`Website changed: ${websiteChanged}`);
  core.info(`Pull request approved: ${approved}`);
  core.info(`Latest content validation run passed: ${validationPassed}`);
  core.info(`Latest website E2E run passed: ${e2ePassed}`);
  core.setOutput('website_changed', websiteChanged);
  core.setOutput('approved', approved);
  core.setOutput('validation_passed', validationPassed);
  core.setOutput('e2e_passed', e2ePassed);
};
