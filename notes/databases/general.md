# N+1 Problem and How to Solve It

The N+1 problem happens when your application fetches a list of items (1 query) and then fetches related data for each item in separate queries (N queries). This leads to poor performance and unnecessary database or API calls.

🧠 Example:
In GraphQL:

```
query {
  posts {
    title
    author {
      name
    }
  }
}
```

If there are 10 posts, the app might run:

- 1 query to get the posts
- 10 queries (one per post) to get each author

That’s 11 total queries instead of just 2.

✅ How to Solve It

1. Batching
   Group multiple related queries into one. For example:
   select all books from db first
   books = `SELECT * FROM BOOKS WHERE ...`
   const authorIds = books.map(p => p.author_id);

   `SELECT * FROM authors WHERE id IN authorIds;`
   You then match each book to its author in memory.
   Instead of multiple queries you only need 2.

2. Eager loading with JOINs

   ```
   SELECT books.title, authors.name
   FROM books
   JOIN authors ON books.author_id = authors.id;
   ```

3. Caching (per request)
   Avoid repeating queries for the same key (e.g., author ID 2 requested multiple times).

4. Use DataLoader (in Node.js GraphQL)
   Wrap database calls in a loader that batches and caches requests automatically.

   `const userLoader = new DataLoader((keys) => batchUsers(keys, models));`

# ACID vs BASE

      Property            SQL                     NoSQL

      Consistency         ACID transactions       BASE (Basically Available, Soft
                                                  state,Eventual)
      Schema              Strict, predefined      Flexible or dynamic
      Scaling             Vertical                Horizontal
      Joins               Native joins            Usually manual or avoided
      Transactions        No support              Some NoSQLs support it (Mongo,    DynamoDB)

ACID guarantees transaction reliability.

1. Atomicity - a transaction must fully commit or fail , no partial updates.
2. Consistency - a transaction must move the DB from one valid state to another.
3. Isolation - concurrent transactions shouldnt affect each others results.
4. Duarability - once committed, always saved.

- BASE is the looser, more flexible cousin of ACID, mostly used in NoSQL.

1. Basically Available - system always responds to requests, even if it cant give the latest data.
2. Soft state - system state may change over time, even without new writes because of replicas synchronizing.
3. Eventual consistency - eventually all replicas will converge to same state if no new updates occurr.

# Federation

- Splitting a database up by function eg Instead of a single monolithic DB, have seperate DBs for users, forums and products leading to less traffic to each
