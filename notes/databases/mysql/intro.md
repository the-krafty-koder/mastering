Schema statements - statements used to create database objects (tables, indexes, constraints )
Data statements - statements used to create, manipulate and retrieve the data stored in a database.
Transaction statements - used to begin, end and rollback transactions.

- The number of rows that a table may contain is more a matter of physical limits (i.e., how much disk drive space is available) and maintainability (i.e., how large a table can get before it becomes difficult to work with) than of database server limitations.

# Normalization

The process of refining a database to ensure that each independent piece of information is only in one place.

# Column

An individual piece of data stored in a table

# Row

A set of columns that together completely describe an entity

# Table

A set of rows held either in memory or permanent storage

# Primary key

One or more columns that can be used as a unique identifier

# Foreign key

One or more columns that can be used as an identifier for a row in another table

# Data dictionary

Set of tables where all elements created by SQL schema statements are stored.

-“A procedural language defines both the desired results and the mechanism, or process, by which the results are generated. Nonprocedural languages also define the desired results, but the process by which the results are generated is left to an external agent.”

# Character types

```
    char(20) - fixed length characters ( all characters of table are same length).

    varchar(20) - variable length
```

Maximumum length of char type is 255 bytes, while varchar is 65,535 bytes. If there is need to store longer strings, use `longtext` or `mediumtext`.

# Desc

Used to show a description of the table
`> desc person`

# Types of tables

Permanent tables - created using the `create table` statement

# Derived tables

- Returned from sub-query statements, held in memory

```
select concat(cust.first_name, '-', cust.last_name) as full_name
from (
    select first_name, last_name, email
    from customer
    where first_name='JESSIE'
) as cust;
```

# Temporary tables

- Volatile data held in memory
  Virtual tables - created using the `create view` statement. Data stored in a temporary table is deleted after the MySQL session ends

```
    CREATE TEMPORARY TABLE actors_j (actor_id SMALLINT(5), first_name VARCHAR(20), last_name VARCHAR(20));
```

# View

A query that is stored in the data dictionary. It looks and acts like a table, but there is no data associated with it.

When the view is created, no additional data is generated or stored: the server simply
tucks away the select statement for future use.

```
    - CREATE VIEW cust_view AS SELECT customer_id, first_name FROM customer;
    - select * from cust_view;
```

# Query clauses

1. select - determines which columns to be included in the result set
2. from - defines the tables used by a query, as well as the means for linking them together
3. where - filters out unwanted rows from the result set
4. group by - group rows together by common column values
5. having - filters out unwanted groups
6. order by - sort by one or more columns
7. distinct - remove duplicates in data `select distinct actor_id from film_actor`
