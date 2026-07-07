# Indexes

Special tables containing columns used to locate rows in the data table. Index tables are kept in a specific order. Used to speed up queries that specify a value for the column.

```
ALTER TABLE customer
ADD INDEX id_email (email);
```

- Use the show command to view all indices in a table
  `SHOW INDEX FROM customer`
- To remove an index, use the following:
  `ALTER TABLE customer DROP INDEX idx_email;`

- You can enforce a rule against duplicate values on a column by creating a unique index
  `ALTER TABLE customer ADD UNIQUE idx_email (email);`

## Multicolumn indices

`ALTER TABLE customer ADD INDEX idx_full_name (first_name, last_name)`

## Types of indexes

1.  B-Trees (Balanced Tree Indexes)
    Branch nodes are used for navigating the tree, while leaf nodes hold the actual values and location information. Each node can link to multiple nodes ( not just 2 like in BST) and the tree is always balanced.

                                [30, 60]
                                /   |   \
                            [10,20] [40,50] [70,80]

2.  Bitmap indexes
    Useful for columns that contain only a small number of values eg boolean. If you were to build a bitmap index on the customer.active column (boolean), the index would maintain two bitmaps: one for the value 0 and another for the value 1. When you write a query to retrieve all inactive customers, the database server can traverse the 0 bitmap and quickly retrieve the desired rows.

3.  Text indexes
    Allows users to search for text within documents without having to search the document each time a search request arrives. eg GIN and GIST indexes

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

4.  Hash indexes
    - A hash index is an index type optimized for exact-match queries (=).
    - Instead of storing values in sorted order (like a B-Tree), it uses a hash function to convert a column value into a hash code.
    - This hash code determines which “bucket” the value belongs to.
    - Each bucket stores pointers to the table rows that have that hash, so the db scans the bucket for rows w ith the exact value (collision resolution) and returns the row(s).

## Disadvantages of an index

- Every index is a special kind of table . Therefore, every time a row is added to or removed from a table, all indexes on that table must be modified.
- Increased storage space as they require additional storage
- Determining the appropriate index can be challenging.

## Useful tips

1. Make sure all primary keys are indexed.
2. Build indexes on all columns that are referenced in foreign key constraints
3. Index any columns that will be frequently used to query data.

# Constraints

A restriction placed on one or more columns on a table
Types of constraints:

1. Primary key constraint - Identify the column or columns that guarantee uniqueness within a table
2. Foreign key constraint - Restrict one or more columns to contain only values found in
   another table’s primary key columns.
3. Uniquness - Restrict one or more columns to contain unique values within a table
4. Check constraint - Restrict the allowable values for a column

```
CONSTRAINT fk_customer_address FOREIGN KEY (address_id)
REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASCADE
```

• on delete restrict, which will cause the server to raise an error if a row is
deleted in the parent table (address) that is referenced in the child table
(customer)
• on update cascade, which will cause the server to propagate a change to the pri‐
mary key value of a parent table (address) to the child table (customer)
