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
