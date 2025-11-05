# SQL tuning

- The attempt to diagnose and repair SQL statements that fail to meet a performance standard.
- SQL tuning is broader. It includes query optimization plus other database-level and configuration improvements

# Goals

- Reduce user response time.
- Improve throughput

# Tasks

1. Proactive SQL tuning - use SQL tuning advisor to check if you can make SQL statements perform better.
2. Reactive SQL tuning - you correct a SQL related problem that a user has experienced.

# Steps

1. Identify high load SQL statements - review past execution history to check statements responsible for a large share of the workload.

2. Gather performance related data from the optimizer statistics.
3. Determine the cause of the problem. Some common ones include:
   1. Ineficciently designed SQL queries ( No joins, executing a subquery for every row)
   2. Suboptimal execution plan - compare execution plans using the query optimizer (which chooses the execution plans)
   3. Missing SQL access structures eg indices and materialized view
   4. Stale optimizer statistics.
   5. Hardware problems.
4. Defining the scope of the problem.
5. Implementing corrective actions.
6. Prevent performance regression.

- You can either do SQL tuning manually or automated using tools like Automatic Database Diagnostic Monitor (ADDM) and SQL Tuning Advisor from Oracle.
