# Query optimization

Process of making SQL queries run faster and using less resources.

# Techniques

1. Use proper indices to speed up reads
2. Select only what you need to reduce memory usage and network traffic. Avoid wildcard (\*)
3. Use where clauses wisely. (Narrow down as early as possible).
4. Optimize JOINS
   - Ensure JOIN keys are indexed.
   - Prefer INNER JOINS when possible
   - Reduce rows before joining (filter first)
5. Use limit when you dont need all results.
6. Avoid subqueries in SELECT or WHERE when possible. (Turn them to joins or CTEs)
7. Use CTEs or Temp tables for repeated work
8. Denormalize when necessary.
9. Partitioning large tables.
10. Analyze execution plans.
11. Using materialised views for data that needs complex joins for aggregation

# Scaling MYSQL

You can scale a db in 3 ways

1. Read volume

- You can optimise reads in a couple of ways
  a) Complex queries

  - Rewrite complex queries so they take less database load eg rewriting a query to use pagination instead of a retrieving a large amount of data at once.
  - Slow queries can be caused by absence of indices, inefficient joins, unnecessary columns being requested etc.

  b) High QPS queries

  - Caused by lots of traffic that cause hiqh query per second requests. Fixed by using efficient caching mechanisms.

2. Write volume

- Under a master slave architecture , replication lag can be experienced. Can be fixed by applying parallel writes on replicas instead of the default sequential.

3. Data size

- Having larger tables makes a smaller percentage of the data be stored in memory, thus the rest being stored in disk space.
- You can reduce table size by changing the data engine from the default InnoDB to RocksDB which has better compression efficiency.
