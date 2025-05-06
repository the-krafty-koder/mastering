# Subquery

Queries contained within another SQL statement.

# Subquery types

## Noncorelated subqueries

Completely self-contained subqueries. They dont reference anything from the containing statements
Scalar subquery - returns a single row and column as part of the result set.

```
mysql> SELECT customer_id, first_name, last_name
-> FROM customer
-> WHERE customer_id = (SELECT MAX(customer_id) FROM customer);
```

If you use a subquery in an equality condition but the subquery returns more than one row, you will receive an error.

```
mysql> SELECT city_id, city
-> FROM city
-> WHERE country_id <>
-> (SELECT country_id FROM country WHERE country <> 'India');
ERROR 1242 (21000): Subquery returns more than 1 row
```

### Multiple row single column subqueries

While you can’t equate a single value to a set of values like above, you can check to see whether a single value can be found within a set of values. Use IN and OR for this.

```

SELECT city_id, city FROM city WHERE country_id IN (SELECT country_id FROM country WHERE country IN ('Canada', 'Mexico'));

```

```

SELECT city_id, city FROM city WHERE country_id NOT IN (SELECT country_id FROM country WHERE country IN ('Canada', 'Mexico'));

```

- The all operator allows you to make comparisons between a single
  value and every value in a set.

  ```
  SELECT first_name, last_name FROM customer WHERE customer_id <> ALL (SELECT customer_id FROM payment WHERE amount=0);
  ```

- The any operator makes a subquery return results as soon as any row matches the condition set.

```
mysql> SELECT customer_id, sum(amount)
-> FROM payment
-> GROUP BY customer_id
-> HAVING sum(amount) > ANY
-> (SELECT sum(p.amount)
-> FROM payment p
-> INNER JOIN customer c
-> ON p.customer_id = c.customer_id
-> INNER JOIN address a
-> ON c.address_id = a.address_id
-> INNER JOIN city ct
-> ON a.city_id = ct.city_id
-> INNER JOIN country co
-> ON ct.country_id = co.country_id
-> WHERE co.country IN ('Bolivia','Paraguay','Chile')
-> GROUP BY co.country
-> );
```

# Multiple column subqueries

```
mysql> SELECT actor_id, film_id
-> FROM film_actor
-> WHERE (actor_id, film_id) IN
-> (SELECT a.actor_id, f.film_id
-> FROM actor a
-> CROSS JOIN film f
-> WHERE a.last_name = 'MONROE'
-> AND f.rating = 'PG');
```

# Corelated subqueries

These are dependent on their containing statements from which they reference one or more columns. Unlike a noncorrelated subquery, a correla‐
ted subquery is not executed once prior to execution of the containing statement; instead, the correlated subquery is executed once for each candidate row (rows that might be included in the final results).

```
SELECT c.first_name, c.last_name FROM customer c WHERE (SELECT count(*) FROM rental r where r.customer_id = c.customer_id) = 20;
```

N/B
since the correlated subquery will be executed once for each row of the containing query, the use of correlated subqueries can cause performance issues if the containing query returns a large number of rows.

- Exists operator is the most commonly used when dealing with subqueries. You use the exists operator when you want to identify that a relationship exists without regard for the quantity

```
mysql> SELECT c.first_name, c.last_name
-> FROM customer c
-> WHERE EXISTS
-> (SELECT 1 FROM rental r
-> WHERE r.customer_id = c.customer_id
-> AND date(r.rental_date) < '2005-05-25');
```

# Data manipulation using correlated subqueries

Subqueries are used heavily in update, delete, and insert statements as well

```
UPDATE customer c
SET c.last_update =
(SELECT max(r.rental_date) FROM rental r
WHERE r.customer_id = c.customer_id);
```
