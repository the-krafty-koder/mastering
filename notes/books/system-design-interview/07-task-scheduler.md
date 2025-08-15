# Task scheduler

- System used to schedule, manage and execute tasks.

# Functional requirements

1. User can submit one time or periodic jobs for execution.
2. Users can cancel submitted jobs
3. System should provide monitoring of job status.
4. System should prevent same job from being executed multiple times concurrently.

# Non-functional requirements

1. System should be able to schedule and execute millions of jobs.
2. High availability - system should be fault tolerant.
3. Minimal latency when scheduling and executing jobs.
4. Jobs should be executed once.

# High level design

    Client -> LB ---> API Servers ----> Database <------------------------------
                                            |                                   |
                                            |                                   |
                                        Scheduling -----> Message Queue ----> Workers
                                        service

1. API Servers

- They save job metadata and return a job id to the client.

2. DB
   Consists of the following tables:
   - Job store -> stores job metadata, including job id, user id, frequency, payload and status.
   - Job execution table -> tracks execution attempts for each job.
   - Job schedules -> stores scheduling details for each job, including `next_run_time`.
3. Scheduling service

- Selects jobs for execution based on `next_run_time`.
- It periodically queries the table for jobs scheduled to run at the current minute.
- Once the due jobs are retrieved, they are pushed to the Message Queue for worker nodes to execute, and job status is changed to schedule.

4. Message Queue

- Acts as a buffer between the Scheduling Service and the Execution Service, ensuring that jobs are distributed efficiently to available worker nodes.

5. Execution service

- Responsible for running the jobs on worker nodes and updating the results in the Job Store.

6. Worker nodes

- Worker nodes are responsible for executing jobs and updating the Job Store with the results (e.g., completed, failed, output).

# API Design

1. Submit Job (POST /jobs)

2. Get Job Status (GET /jobs/{job_id})

3. Cancel Job (DELETE /jobs/{job_id})

4. List Pending Jobs (GET /jobs?status=pending&user_id=u003)

5. Get Jobs Running on a Worker (GET /job/executions?worker_id=w001)

# Deep dive

1. Database
   Given the scale of the data ( tasks could be millions per day), NoSQL database like DynamoDB or Cassandra could be a better fit, especially when handling millions of jobs per day and supporting high-throughput writes and reads.

2. Scaling scheduling service

- Partition the job schedules table using the `next_run_time` column to fasten reads.
- Multiple worker nodes should handle job execution in parallel, coordinated by a worker node.
- To ensure that jobs are not processed by multiple workers at the same time, each worker processes only a subset of jobs depending on assigned segments.

3. Handling failures

- When a job fails during execution, worker node increment retry count in job table. If retry count is below threshold, worker retrys the job. If it passes threshold, it is marked as failed status and sent to a dead letter queue

4. Handling worker failure

- Workers uses heartbeat mechanism by sending periodic signals to coordinator. If worker is dormant for a while, they are assumed to have failed.
- Coordinator can also perform periodic health checks.
- If a worker fails, the system must recover so its jobs still run:
- Pending jobs (assigned but not started): re-queue for another worker to pick up.
- In-progress jobs: use checkpointing so progress can be resumed; if no checkpoint, mark as failed and re-queue for retry.

5. Handling single point failure

- To avoid a coordinator single point of failure, run multiple coordinators with leader election (e.g., Raft, Paxos via ZooKeeper/etcd). If the leader fails, others detect it, elect a new leader, and continue operations using shared state in a distributed database so the new leader has up-to-date scheduling and worker health data.
