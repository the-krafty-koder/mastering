# View

A mechanism for querying data. Views do not involve data storage.

- Use the `CREATE VIEW <viewname>` statement to create a view. Example

```
CREATE VIEW customer_vw
(
    customer_id,
    first_name,
    last_name,
    email
)
AS SELECT
    customer_id,
    first_name,
    last_name,
    concat(substr(email,1,2), '*****', substr(email, -4)) email
FROM customer;
```

// Execute the above view

```
SELECT first_name, last_name, email
FROM customer_vw;
```

- You can perform most functions on views just as you would a table. Example use any clauses of the select statement when querying a view eg order by, group by, where etc. You can also join a view to another table or a view.

# View applications

1. Data security
   You can hide sensitive data using views, as shown below with the email column;

   ```
   CREATE VIEW active_customer_vw
   (
    customer_id,
    first_name,
    last_name,
    email
   )
   AS SELECT
    customer_id,
    first_name,
    last_name,
    concat(substr(email,1,2), '*****', substr(email, -4)) email
   FROM customer
   WHERE active = 1;
   ```

2. Data aggregation
   Views can be used to provide aggregate data for reporting applications.

3. Hiding complexity
   Complex queries can be written and made available via a view so report designers dont have to write them
4. Joining partitioned data
   You can make data from multiple tables appear as one by using a view to join them.

# Updatable views

A view is updatable if the following conditions are met (MySQL):

1. No aggregate functions are used
2. The view does not employ group by or having clauses
3. The view does not utilize union or union all statements.
4. The from clause includes at least one table or updatable view
5. The from clause uses only inner joins if there is more than one table or view.

N/B Views that contain derived columns (columns as the result of an expression) cannot be used to insert data, even if the derived columns are not included in the statement.

SELECT sum(p.amount)
FROM customer c
INNER JOIN payment p
ON p.customer_id = c.customer_id
INNER JOIN address a
ON c.address_id = a.address_id
INNER JOIN city ct
ON a.city_id = ct.city_id
INNER JOIN country cn
ON ct.country_id = cn.country_id
GROUP BY cn.country;
