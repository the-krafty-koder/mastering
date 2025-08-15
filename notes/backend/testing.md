# Testing

- Evaluating a system with the intent to find whether it satisfies a specific requirement.

# Verification & Validation

- Verification ensures software meets all its functionalities, it addresses the concern "are you building the it right"?
- Validation ensures that the functionality meets intended behavior, it addresses the concern "are you building the right thing?"
- Verification takes place first, validation later.

# Manual testing

- Includes testing software manually. Has different stages including unit, integration and system and user acceptance testing.

# Automation testing

- The tester writes scripts and uses another software to test the product.
- It can also be used to test performance, load and stress.

        When to automate
        1. Large and critical software projects.
        2. Projects that require testing the same area frequently.
        3. Requirements not changing frequently.
        4. Availability of time.

- Tools used for automation testing include Selenium, TestComplete, Silktest

# Software testing methods

1. Black box testing

- Testing without having any knowledge of interior workings of the application.
- Tester does not have access to the source code and works with the apps user interface, giving input and checking if output meets standards.

        Advantages
        1. Well suited for large code segments.
        2. Code access is not required.
        3. Large no. of mid skilled testers can test the app without knowledge of internal implementation.

        Disadvantages
        1. Limited coverage since only a small number of scenarios is actually performed.
        2. Inefficient testing since tester has only limited knowledge.
        3. Blind coverage since the tester cannot target specific areas.

2. White box testing

- Involves detailed investigation of the internal workings of code. Tester needs to have a look inside the code.

        Advantages
        1. Tester has knowledge of the source code, so it is easy to find out which data is required to test effectively.
        2. Helps in optimizing the code.
        3. Maximum test coverga is attained due to tester knowing the code.
        4. Tester can remove unneeded lines of code.

        Disadvantages
        1. Skilled tester is required.
        2. Difficult to maintain white box testing as specialiezed tools are required eg code profilers

3. Grey-box testing

- Testing the app while having a limited knowledge of its internal workings.

        Advantages
        1. Offers combined benefits of black-box and white-box testing wherever possible.
        2. Grey box testers don't rely on the source code; instead they rely on interface definition and functional specifications.
        3. Based on the limited information available, a grey-box tester can design excellent test scenarios especially around communication protocols and data type handling.
        4. The test is done from the point of view of the user not designer.

        Disadvantages
        1. Since the access to source code is not available, the ability to go over the code and test coverage is limited.
        2. The tests can be redundant if the software designer has already run a test case.
        3. Testing every possible input stream is unrealistic because it would take an unreasonable amount of time; therefore, many program paths will go untested.

# Software testing levels

1.  Functional testing
    A type of blackbox testing based on the specifications of the software to be tested.

    Steps
    I The determination of the functionality that the intended application is meant to perform.
    II The creation of test data based on the specifications of the application.
    III The output based on the test data and the specifications of the application.
    IV The writing of test scenarios and the execution of test cases.
    V The comparison of actual and expected results based on the executed test cases.

    a) Unit testing

    - Testing individual units of source code. Isolates each part of a program test if individual units are correct.

      Disadvantages

      - It is impossible to test every execution path.
      - There is a limit to the number of test scenarios that a developer can use to verify source code.

    b) Integration testing

    - Testing the combined parts of an application to determine if they function correctly. Can be done in 2 ways: bottom up and top down.

    - Bottom-up: Testing begins with unit testing, then higher levels combination of units called modules.
    - Top-down: Testing begins with higher level modules then lower level modules.

    c) System testing

    - Tests the system as a whole.

    d) Regression testing

    - Tests perfomed to check whether a fixed bug hasn't resulted in a violation of functionality. Any change should not result in another fault being uncovered.

             Advantages

    1. Verifies new changes dont break the app.
    2. Mitigates risk.
    3. Increase speed to market the product.
    4. Minimizes the gap in testing when an application that's been changed needs to be tested.

    e) User acceptance testing

    - Conducted by QA professionals to check whether the app meets client requirements.

    f) Alpha testing

    - The 1st phase of the testing process run by developers and QA. Unit, integration and system tests when combined together is called alpha testing.

    g) Beta testing

    - A sample of the intended audience tests the application.

2.  Non-functional testing

- Testing the characteristics of the system eg performance, security, usability etc

  1. Performance testing

  - Causes of poor performance in software

  1. Network delay
  2. Client side processing
  3. Database transaction processing.
  4. Load balancing between servers.
  5. Data rendering.

  - Performance testing is very important. It tests speed, capacity, stability and scalability.

  - It can be divided into load testing and stress testing.

  a) Load testing

  - Testing behavior by applying maximum load in terms of passing large input data.
  - Uses automated software tools eg LoadRunner and Apploader. Most use virtual users to mimic large number of concurrent users.

  b) Stress testing

  - Testing performance of software under abnormal conditions. May include taking away some resources or applying a load beyond the actual limit.
  - The aim is to identify breaking point of the software. Can be perfomed by:
    1. Shutdown or restart of network ports randomly.
    2. Turning database on or off.
    3. Running different processes that consume resources eg CPU

  2. Usability testing

  - Used to identify any errors by observing users as they use and operate on the software.

  3. Security testing

  - Testing to identify flows and gaps from a security point of view. Should ensure confidentiality, integrity, authentication, availability etc.

  4. Portability testing

  - Tests to ensures reusability and ability to be moved from another software as well.

# Testing documentation

- Documentation helps in identifying the test effort required, test coverage etc.

1. Test plan

- Outlines the strategy used to test the application.
- Includes:
  - Assumptions while testing the application
  - List of test cases
  - List of features to be tested.
  - Approach to use while testing the software.

2. Test scenario

- One line statement that notifies what area in the application will be tested.Used to ensure all process flows are tested end to end.
- Test scenario has several steps while test case has a single step.

3. Test case

- A set of tests to be used when performing a testing task. Ensures a software passes or fails in terms of its functionality.

# Mocking vs stubbing

Stub - a piece of code that returns hardcoded data so your tests can run.
Mock - not only returns fake data but also records information about how it was called and lets you make assertions about that.

- Mocks mimic real behavior while stubs return hardcoded data.
