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

   `FROM authors WHERE id IN (1, 2, 3, ..., N);`

2. Caching (per request)
   Avoid repeating queries for the same key (e.g., author ID 2 requested multiple times).

3. Use DataLoader (in Node.js GraphQL)
   Wrap database calls in a loader that batches and caches requests automatically.

   `const userLoader = new DataLoader((keys) => batchUsers(keys, models));`
