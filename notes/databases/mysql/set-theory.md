When perfoming set operations:

1. Both data sets must have same number of columns
2. The data types of each column across the two data sets must be same

# Set operators

1. Union
   Union and union all allows you to combine multiple data sets. The difference between the two is that union sorts the combined set and removes duplicates.

   ```
       SELECT 'CUST' typ, c.first_name, c.last_name
       FROM customer c
       UNION ALL
       SELECT 'ACTR' typ, a.first_name, a.last_name
       FROM actor a;
   ```

   ```
       SELECT c.first_name, c.last_name
       FROM customer c
       WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%'
       UNION
       SELECT a.first_name, a.last_name
       FROM actor a
       WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%';
   ```

2. Intersect
   Used to find rows that are common in both result sets. Intersect removes any duplicate rows.

   ```
       SELECT c.first_name, c.last_name
       FROM customer c
       WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%'
       INTERSECT
       SELECT a.first_name, a.last_name
       FROM actor a
       WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%';
   ```

3. Except
   Shows the results of A except B, which is the whole of set A minus any
   overlap with set B

   ```
    SELECT a.first_name, a.last_name
    FROM actor a
    WHERE a.first_name LIKE 'J%' AND a.last_name LIKE 'D%'
    EXCEPT
    SELECT c.first_name, c.last_name
    FROM customer c
    WHERE c.first_name LIKE 'J%' AND c.last_name LIKE 'D%';
   ```

# Set operation rules
