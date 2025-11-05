# SOLID Principles

1. Single responsibility

- Every class should have a single responsibility.

2. Open/Closed principle

- You should be able to extend a class for behavior without modifying it.

3. Liskov's substitution principle

- Any class that is the child of the parent class should be usable in place of its parent class without any unexpected behavior.

4. Interface segregation principle

- Avoid fat interfaces and give preference to many small client-specific interfaces.

5. Dependency Inversion principle

- Classes should rely on abstractions eg interfaces or abstract classes and not low level modules (concrete implementations)

# Need for SOLID principles in object oriented design

- Make code easier to maintain
- Encourages flexibility.

# Scaling a codebase

1. Make use of modules
2. Type safety/hinting
3. Follow code conventions
4. Testing & CI/CD
5. Documentation
6. Version control and feature management.
7. Refactoring

# Candidate key in DB

- A column or set of columns that uniquely identify a row in a DB.

# How would you set up a continuous integration/continuous deployment (CI/CD) pipeline for backend services?

There are multiple considerations to have while setting up Continuous Integration and Continuous Delivery pipelines:

Using source control as the trigger for the entire process (git for example). The build pipelines for your backend services should get executed when you push your code into a specific branch.

Pick the right CI/CD platform for your needs, there are many out there such as GitHub Actions, GitLab CI/CD, CircleCI and more.

Make sure you have automated unit tests that can be executed inside these pipelines.

Automatic deployment should happen only if all tests are executed successfully, otherwise, the pipeline should fail, preventing broken code from reaching any environment.

Use an artifact repository such as JFrog Artifactory or Nexus Repository to store successfully built services.

Finally, consider setting up a rollback strategy in case something goes wrong and the final deployed version of your service is corrupted somehow.
