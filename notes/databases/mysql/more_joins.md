# Cross Joins

Cartesian product - the result of joining multiple tables without specifying any join conditions. Result set returns every possible combination of the columns listed in the select.

```
SELECT c.name category_name, l.name language_name FROM category C  CROSS JOIN language l;
```

# Natural joins

A join type that allows you to name the tables to be joined but lets the database server determine what the join conditions need to be.

```
mysql> SELECT c.first_name, c.last_name, date(r.rental_date)
-> FROM customer c
-> NATURAL JOIN rental r;
```

SELECT cust.first_name, cust.last_name, date(r.rental_date)
FROM
(SELECT customer_id, first_name, last_name
FROM customer
) cust
NATURAL JOIN rental r;
