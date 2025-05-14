# Case

The case expression is used for conditional logic. It can be used in SELECT, INSERT, UPDATE, DELETE statements

An example of a searched case expression.

```
SELECT first_name, last_name,
CASE
    WHEN active = 1 THEN 'ACTIVE'
    ELSE 'INACTIVE'
END activity_type
FROM customer;
```

Simple case expression

```
CASE category.name
WHEN 'Children' THEN 'All Ages'
WHEN 'Family' THEN 'All Ages'
WHEN 'Sports' THEN 'All Ages'
ELSE 'Other'
END
```

SELECT 1 FROM film_actor fa
INNER JOIN film f ON fa.film_id = f.film_id
WHERE fa.actor_id = a.actor_id
AND f.rating = 'PG'
