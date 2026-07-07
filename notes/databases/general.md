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

# Postgres full text search

- Postgres doesn’t just compare raw text — it breaks text into tokens (words or terms), reduces them to lexemes (normalized forms, e.g. “running” → “run”), and then stores or indexes these lexemes for fast search.

- There are 3 main components

  1.  tsvector -> a list of unique, normalized lexemes (keywords) with their positions in the text.
  2.  tsquery -> a search query ( what youre looking for)
  3.  @@ -> the match operator between tsvector and tsquery.

- For this table

```
CREATE TABLE documents (
  id serial PRIMARY KEY,
  content text
);
```

- You can insert data and search it like so

```
INSERT INTO documents (content)
VALUES ('Running fast improves your stamina.');
```

```
SELECT *
FROM documents
WHERE to_tsvector('english', content) @@ to_tsquery('run & fast');
```

# GIN VS GIST indexing in Postgres full text search

GIN

- GIN stands for general inverted index. It is designed for data that contains many elements inside a single column, like arrays or ts_vector.
- Normally a B-Tree index maps `value -> row` but GIN inverts this mapping to `term -> list of rows containing that term`.
- When you run

```
CREATE INDEX idx_docs_fts ON documents
USING GIN (to_tsvector('english', content));
```

- Postgres:

  1.  Converts each content value into a tsvector.
  2.  Extracts each lexeme (word stem).
  3.  Builds an index mapping:

      ```
      'run' → [row 1, row 4, row 9]
      'fast' → [row 1, row 7]
      'stamina' → [row 1, row 3, row 10]
      ```

  4.  Stores this mapping compactly for quick lookup.

GIST

- Stands for Generalised Search Tree. It is a balanced tree index data structure, a framework that can support different types of data, not just text. Think of GiST as a toolkit for building custom indexes.
- It is used internally for full-text search, range types, similarity search etc.
- GIST organises data hierarchially but ordering depends on closeness or overlap.
- When used in full text search, GIN stores same kind of info as GIST but in a tree rather than a mapping (inverted list).
- use GIN for full text search and GIST for similarity search.
