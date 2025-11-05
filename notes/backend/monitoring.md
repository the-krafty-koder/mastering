# Monitoring

- We use it to gain insights into how well an application is functioning.

# Uses

- Ensuring the system remains healthy.
- Tracking the availability of the system and its components.
- Maintaining perfomance to ensure throughput does not degrade.
- Guaranteeing the system meets SLAs.
- Tracking operations performed for auditing purposes.
- Monitoring trends that need to be addressed.

# Health monitoring

- A comprehensive health-monitoring system enables an operator to drill down through the system to view the health status of subsystems and components
- Generate raw data required for health monitoring by:
  1. Tracing execution of user requests.
  2. Logging exceptions, faults and warnings.
  3. Monitoring the health of 3rd party services.
  4. Endpoint monitoring
  5. Collecting performace information eg background CPU utilisation or network traffic.
  6. Synthetic monitoring - tracking whole user journeys.

# Availability monitoring

- Concerned with tracking the availability of the system and its components to generate statistics about the uptime.
- Availability data can be obtained by performing endpoint monitoring, synthetic user monitoring or logging.
- Data must be aggregated to support the following kinds of analysis
  1. Immediate system and subsystem availability.
  2. Availability failure rates of system and subsystem.
  3. Historical view of failure rates.
  4. Reasons for unavailability of system.

# Perfomance monitoring

- Determine the level at which the system should be performing and then monitor as the system is placed under more stress.
- To examine system performance, measure

  1. Response rates for user requests.
  2. Number of concurrent user requests.
  3. Volume of network traffic.
  4. Processing times for requests.

- Gather performance data by checking error rates, throughput and number of concurrent users.

# Security monitoring

- All systems containing sensitive data must have a security structure. The complexity of the security mechanism is determined by sensitivity of the data.
- Eg in a system that requires users to be authenticated, collect data on:

1. Number of failed attempts to login.
2. All operations performed by an authenticated user.
3. When a user session ends and user signs out.

- Security monitoring should enable an operator to quickly

  1. Detect attempted intrusions by a security entity.
  2. Identify attempts by entities to perform unauthorized operations.
  3. Determine whether the system is under attack.

- Security data can be generated at multiple points in the system. 3rd party tools eg port scanning or network filters.
- Security data should not be manually viewed but stored in a secure storage for expert analysis.

# SLA Monitoring

- Check if system is in alignment with SLAs.
- SLAs are often defined in form of
  1. Overal system availability.
  2. Operational throughput eg 100,000 concurrent users.
  3. Operational response time.
- High level indicators for whether a system meets its SLAs include:
  1. Percentage of service uptime.
  2. Application throughput.
  3. Number of failing requests.
  4. Number of application faults and warnings.

# Usage monitoring

- Tracks how the features and components are used.
- Operator needs to see information like
  1. No. of requests processed by each subsystem and directed to each resource.
  2. Work that each user is performing.
  3. Volume of data storage each user occupies.
  4. Resources each user is accessing

# Auditing

- Non-repudiation means that once someone performs an action — like sending a message, signing a document, or making a transaction — they cannot later deny having done it.

# Monitoring pipeline

    Data sources -> Data collection -> Analysis and diagnosis -> Visualisation and alerting

# Sources of monitoring data

1. Application level

- Traces
- Logging warnings and exceptions
- Profiling

2. Operating system

- Performance counters that indicate I/O rates, memory utilisation and CPU usage

3. Release pipeline

# Instrumentation

- To make a system observable, it must be instrumented. That is, the code must emit traces, metrics, or logs. The instrumented data must then be sent to an observability backend.

# Read about instrumentation, collecting, analysing and storing data.
