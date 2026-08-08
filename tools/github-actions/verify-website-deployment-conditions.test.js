const assert = require('node:assert/strict');
const test = require('node:test');

const verifyDeploymentConditions = require(
  './verify-website-deployment-conditions.js',
);

const successfulRun = createdAt => ({
  status: 'completed',
  conclusion: 'success',
  created_at: createdAt,
  run_started_at: createdAt,
  updated_at: '2026-08-08T10:02:00Z',
});

const runVerification = async ({
  validationRuns,
  e2eRuns,
  maxPollAttempts = 1,
}) => {
  const outputs = new Map();
  const listFiles = Symbol('listFiles');
  const listReviews = Symbol('listReviews');
  const listWorkflowRuns = Symbol('listWorkflowRuns');
  let validationRequest = 0;
  let e2eRequest = 0;
  const responseForRequest = (responses, request) =>
    Array.isArray(responses[0])
      ? responses[Math.min(request, responses.length - 1)]
      : responses;
  const github = {
    paginate: async (method, options) => {
      if (method === listFiles) {
        return [{ filename: 'website/src/content.md' }];
      }
      if (method === listReviews) {
        return [
          {
            user: { login: 'reviewer' },
            submitted_at: '2026-08-08T09:50:00Z',
            state: 'APPROVED',
          },
        ];
      }
      if (options.workflow_id === 'validate-content.yml') {
        return responseForRequest(validationRuns, validationRequest++);
      }
      if (options.workflow_id === 'website-e2e.yml') {
        return responseForRequest(e2eRuns, e2eRequest++);
      }
      throw new Error(`Unexpected pagination request for ${String(method)}`);
    },
    rest: {
      pulls: { listFiles, listReviews },
      actions: { listWorkflowRuns },
    },
  };

  await verifyDeploymentConditions({
    github,
    context: {
      payload: {
        pull_request: {
          number: 123,
          head: { sha: 'abc123' },
          merged_at: '2026-08-08T10:00:00Z',
        },
      },
      repo: { owner: 'gibbok', repo: 'typescript-book' },
    },
    core: {
      info: () => {},
      setOutput: (name, value) => outputs.set(name, value),
    },
    maxPollAttempts,
    pollIntervalMs: 0,
    sleep: async () => {},
  });

  return outputs.get('ready');
};

test('allows deployment after both prerequisite workflows passed', async () => {
  const run = successfulRun('2026-08-08T09:55:00Z');
  assert.equal(
    await runVerification({ validationRuns: [run], e2eRuns: [run] }),
    true,
  );
});

test('rejects a successful cleanup run that started after the merge', async () => {
  const failedTestRun = {
    ...successfulRun('2026-08-08T09:55:00Z'),
    conclusion: 'failure',
  };
  const successfulCleanupRun = successfulRun('2026-08-08T10:00:00Z');
  assert.equal(
    await runVerification({
      validationRuns: [successfulRun('2026-08-08T09:55:00Z')],
      e2eRuns: [successfulCleanupRun, failedTestRun],
    }),
    false,
  );
});

test('rejects a prerequisite workflow that remains in progress', async () => {
  const inProgressRun = {
    ...successfulRun('2026-08-08T09:58:00Z'),
    status: 'in_progress',
    conclusion: null,
  };
  assert.equal(
    await runVerification({
      validationRuns: [successfulRun('2026-08-08T09:55:00Z')],
      e2eRuns: [inProgressRun],
    }),
    false,
  );
});

test('waits for a pre-merge workflow run to finish successfully', async () => {
  const inProgressRun = {
    ...successfulRun('2026-08-08T09:58:00Z'),
    status: 'in_progress',
    conclusion: null,
  };
  const completedRun = {
    ...inProgressRun,
    status: 'completed',
    conclusion: 'success',
  };
  assert.equal(
    await runVerification({
      validationRuns: [successfulRun('2026-08-08T09:55:00Z')],
      e2eRuns: [[inProgressRun], [completedRun]],
      maxPollAttempts: 2,
    }),
    true,
  );
});
