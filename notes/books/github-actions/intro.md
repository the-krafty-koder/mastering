# Github Actions

- It is a CI/CD platform used that allows you to automate your build, test and deployment pipelines.
- Can also be used when other events happen in your repository.

# Components

1. Workflow - a configurable automated process that will run one or more jobs. They are defined by a YAML file and will be triggered by an event in your repository, manually or at a defined schedule. They are defined in the `./github/workflows` directory.
2. Event - a specific activity in a repository that triggers a workflow, eg creating a PR.
3. Jobs - a set of steps in a workflow that is executed by the same runner.Each step is either a shell script or an action. Steps are executed in order and are dependent on each other. They can also share data amongst themselves.
4. Action - a custom application for the Github Actions platform that performs a complex but repeated task. Use an action to reduce the amount of repetetive code in your workflow files.
5. Runner - a server that runs your workflow files when theyre triggered. Each runner can run a single server at a time.
