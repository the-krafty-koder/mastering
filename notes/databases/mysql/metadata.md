Metadata - data about data.

# Information_schema

A special database used to store metadata. Unlike `desc` it can be queried.

```
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'sakila'
ORDER BY 1;
```

```
select table_name, is_updatable from information_schema.views where table_schema = 'sakila' order by 1;
```

- Column information for both tables and views is available via the columns view

```
SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'sakila' AND table_name = 'film';
```

- Retrieve information about a column's index by using the `information_schema.statistics` view

```
SELECT table_name, column_name, index_name, index_type  FROM information_schema.statistics WHERE table_schema = 'sakila' AND table_name = 'rental';
```

- Retrieve the different types of constraints using the `information_schema.table_constraints` view

# Information_schema views

View name Provides information about...
schemata Databases
tables Tables and views
columns Columns of tables and views
statistics Indexes
user_privileges Who has privileges on which schema objects
schema_privileges Who has privileges on which databases
table_privileges Who has privileges on which tables
column_privileges Who has privileges on which columns of which tables
character_sets What character sets are available
collations What collations are available for which character sets
collation_character_set_applicability Which character sets are available for which collation
table_constraints The unique, foreign key, and primary key constraints
key_column_usage The constraints associated with each key column
routines Stored routines (procedures and functions)
views Views
triggers Table triggers
plugins Server plug-ins
engines Available storage engines
partitions Table partitions
events Scheduled events
processlist Running processes
referential_constraints Foreign keys
parameters Stored procedure and function parameters
profiling User profiling information

# Working with metadata

You can use info from the metadata table to do the following:

1. Schema generation scripts
2. Deployment verification - after large changes have been made to the database, you can query metadata tables to check if the database contains right amount of columns/tables
3. Dynamic SQL generation - submitting SQL strings to a database engine instead of using the SQL interface
