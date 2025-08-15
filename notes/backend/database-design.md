# Steps for database design

1. Identify purpose of DB.
2. Find information required.
3. Divide that info into tables and info items into columns.
4. Specify primary keys.
5. Determine relationships between tables.
6. Refine the design.
7. Apply normalization rules.

# Normalization

Organizing data to reduce redundancy and maintain data integrity.

1st Normal Form

- States that at every intersection of a row and column there exists a single value and never a list of values.

2nd Normal form

- States that each non-key column be fully dependent on the entire primary key, not just part of the key. This rule applies when you have a product key that contains more than 1 column.

3rd Normal form

- States that each non-key column must be dependent on the primary key and nothing but the primary key.
