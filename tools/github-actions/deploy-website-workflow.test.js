const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repositoryRoot = path.resolve(__dirname, '../..');
const workflow = readFileSync(
  path.join(repositoryRoot, '.github/workflows/deploy-website.yml'),
  'utf8',
);

test('deploys only after a website pull request is merged', () => {
  assert.match(
    workflow,
    /on:\n  pull_request:\n    types: \[closed\]\n    paths:\n      - 'website\/\*\*'/,
  );
  assert.match(workflow, /if: github\.event\.pull_request\.merged == true/);
  assert.doesNotMatch(workflow, /workflow_call:|push:|workflow_dispatch:/);
});

test('publishes through the existing GitHub Pages command', () => {
  assert.match(workflow, /working-directory: tools/);
  assert.match(workflow, /make website-deploy/);

  const makefile = readFileSync(
    path.join(repositoryRoot, 'tools/Makefile'),
    'utf8',
  );
  assert.match(
    makefile,
    /website-deploy:\n\tcd \.\.\/website && npm run deploy/,
  );

  const packageJson = JSON.parse(
    readFileSync(path.join(repositoryRoot, 'website/package.json'), 'utf8'),
  );
  assert.equal(packageJson.scripts.deploy, 'npm run build && npx gh-pages -d dist');
});

test('does not keep a second deployment trigger', () => {
  assert.equal(
    existsSync(
      path.join(
        repositoryRoot,
        '.github/workflows/trigger-website-deployment.yml',
      ),
    ),
    false,
  );
});
