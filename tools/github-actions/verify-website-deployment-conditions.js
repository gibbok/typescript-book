module.exports = async ({
  github,
  context,
  core,
  maxPollAttempts = 90,
  pollIntervalMs = 10000,
  sleep = milliseconds =>
    new Promise(resolve => setTimeout(resolve, milliseconds)),
}) => {
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

  const latestRunStartedBeforeMerge = async (workflowId) => {
    const runs = await github.paginate(github.rest.actions.listWorkflowRuns, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: workflowId,
      event: 'pull_request',
      head_sha: pullRequest.head.sha,
      per_page: 100,
    });
    const mergedAt = new Date(pullRequest.merged_at);
    return runs
      .filter(
        ({ run_started_at, created_at }) =>
          new Date(run_started_at ?? created_at) < mergedAt,
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  };
  let latestValidationRun;
  let latestE2ERun;
  for (let attempt = 1; attempt <= maxPollAttempts; attempt += 1) {
    [latestValidationRun, latestE2ERun] = await Promise.all([
      latestRunStartedBeforeMerge('validate-content.yml'),
      latestRunStartedBeforeMerge('website-e2e.yml'),
    ]);
    const runs = [latestValidationRun, latestE2ERun];
    const failed = runs.some(
      run => run?.status === 'completed' && run.conclusion !== 'success',
    );
    const completed = runs.every(run => run?.status === 'completed');
    if (failed || completed || attempt === maxPollAttempts) {
      break;
    }
    core.info(
      `Waiting for prerequisite workflows (${attempt}/${maxPollAttempts})`,
    );
    await sleep(pollIntervalMs);
  }

  const runPassed = run =>
    run?.status === 'completed' && run.conclusion === 'success';
  const validationPassed = runPassed(latestValidationRun);
  const e2ePassed = runPassed(latestE2ERun);
  const ready = websiteChanged && approved && validationPassed && e2ePassed;

  core.info(`Website changed: ${websiteChanged}`);
  core.info(`Pull request approved: ${approved}`);
  core.info(
    `Latest pre-merge content validation run passed: ${validationPassed}`,
  );
  core.info(`Latest pre-merge website E2E run passed: ${e2ePassed}`);
  core.info(`Website deployment ready: ${ready}`);
  core.setOutput('ready', ready);
};
