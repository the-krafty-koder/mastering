# Partitioning

- Splitting a large table into smaller pieces.
- Once a table has been partitioned, the table itself becomes a virtual concept; the partitions hold the data, and any indexes are built on the data in the partitions. However, the database users can still interact with the table without knowing that the table had been partitioned.

- Horizontal partitioning - assigning entire rows to a single partition.You must choose a partition key ( usually a single column ) and a partition function to identify in which partition a row should reside.
- You can partition vertically as well ( by column) but you have to do this manually.

# Partitioning methods

1. Range partition
   Most commonly used to partition rows by date ranges

```
->PARTITION BY RANGE (yearweek(sale_date))
-> (PARTITION s1 VALUES LESS THAN (202002),
-> PARTITION s2 VALUES LESS THAN (202003),
-> PARTITION s3 VALUES LESS THAN (202004),
-> PARTITION s4 VALUES LESS THAN (202005),
-> PARTITION s5 VALUES LESS THAN (202006),
-> PARTITION s999 VALUES LESS THAN (MAXVALUE));
```

2. List partitioning
   If the column chosen as the partitioning key contains an enumerated set of values, use list partitioning.

```
mysql>
CREATE TABLE sales
(sale_id INT NOT NULL,
cust_id INT NOT NULL,
store_id INT NOT NULL,
sale_date DATE NOT NULL,
geo_region_cd VARCHAR(6) NOT NULL,
amount DECIMAL(9,2)
)
PARTITION BY LIST COLUMNS (geo_region_cd)
(PARTITION NORTHAMERICA VALUES IN ('US_NE','US_SE','US_MW','US_NW','US_SW','CAN','MEX'),
PARTITION EUROPE VALUES IN ('EUR_E','EUR_W'),
PARTITION ASIA VALUES IN ('CHN','JPN','IND')
);

// ALTERING
ALTER TABLE sales REORGANIZE PARTITION ASIA INTO ( PARTITION ASIA VALUES IN ('CHN','JPN','IND', 'KOR'));
```

3. Hash partitioning
   Distributes rows evenly across partitions by using a hash of the column value. Works best when the partitioning key column contains a large number of distinct values.

   ```
   mysql> CREATE TABLE sales
   -> (sale_id INT NOT NULL,
   -> cust_id INT NOT NULL,
   -> store_id INT NOT NULL,
   -> sale_date DATE NOT NULL,
   -> amount DECIMAL(9,2)
   -> )
   -> PARTITION BY HASH (cust_id)
   -> PARTITIONS 4
   -> (PARTITION H1,
   -> PARTITION H2,
   -> PARTITION H3,
   -> PARTITION H4
   -> );
   ```

4. Composite partitioning
   Uses 2 different types of partitions for the same table;

```
mysql> CREATE TABLE sales
-> (sale_id INT NOT NULL,
-> cust_id INT NOT NULL,
-> store_id INT NOT NULL,
-> sale_date DATE NOT NULL,
-> amount DECIMAL(9,2)
-> )
-> PARTITION BY RANGE (yearweek(sale_date))
-> SUBPARTITION BY HASH (cust_id)
-> (PARTITION s1 VALUES LESS THAN (202002)
-> (SUBPARTITION s1_h1,
-> SUBPARTITION s1_h2,
-> SUBPARTITION s1_h3,
-> SUBPARTITION s1_h4),
-> PARTITION s2 VALUES LESS THAN (202003)
-> (SUBPARTITION s2_h1,
-> SUBPARTITION s2_h2,
-> SUBPARTITION s2_h3,
-> SUBPARTITION s2_h4));
```

# Advantages of partitioning

1. You only need to interact with few partitions instead of the whole table (partition pruning);
2. You can quicky delete data that is no longer needed. (Example if table is partitioned by date range, delete older dates)

# Clustering

Using multiple database servers to serve a large number of concurrent users.

# Sharding

Partitioning data across multiple databases
