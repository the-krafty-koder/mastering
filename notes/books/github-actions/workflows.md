# Workflows

- A configurable automated process that will run one or more jobs.

# Basics

- A workflow must contain the following basic components:
  1. One or more events that will trigger the workflow.
  2. One or more jobs - each of which will execute on a runner machine and run
     series of one or more steps.
  3. Each step can either run a script or an action.

# Triggering a workflow

- Workflow triggers are events that cause workflows to run. These events can be:
  1. Events occuring in your workflow repo
  2. Events occurring outside of github and trigger a repository_dispatch event on GH
  3. Scheduled times
  4. Manual

# Workflow syntax

```
name: CI Pipeline

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

name: optional name for the workflow. GH displays workflow names under the Actions tab

run-name: the name for workflow runs generated from the workflow.

on: used to define which events can cause the workflow to run. Has a lot more configuration for specific scenarios. View them on the GH actions page.
eg `on: push` or `on: [push, fork]` or

```
on:
pull_request:
schedule: - cron: '0 0 \* \* \*' # Run daily at midnight UTC

```

permissions: used to modify the default permissions granted to the GITHUB_TOKEN

```
permissions:
  actions: read|write|none
  attestations: read|write|none
  checks: read|write|none
```

env: a map of variables available to the steps of all jobs in the workflow.

```
env:
  SERVER: production
```

defaults: used to create a map of all default settings that will apply to all the jobs in workflows.

defaults.run: used to provide default shell and working directory options for all runs in a workflow.

```
defaults:
  run:
    shell: bash
    working-directory: ./scripts
```

concurrency: used to ensure that only a single job or workflow using the same concurrency group will run at a time.

jobs: used to set up jobs. Jobs run in parallel by default.To run them sequentially, you can define dependencies on other jobs using the jobs.<job_id>.needs keyword.
