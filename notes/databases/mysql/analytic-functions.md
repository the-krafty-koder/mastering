# Data windows

- Analytic functions provide the ability to group similar rows into windows, which partition the data to be used by the analytic function without changing the result set.
- Windows are defined using the over clause combined with an optional partition by subclause.

```
mysql> SELECT quarter(payment_date) quarter,
-> monthname(payment_date) month_nm,
-> sum(amount) monthly_sales,
-> max(sum(amount)) over () max_overall_sales,
-> max(sum(amount)) over (partition by quarter(payment_date)) max_qrtr_sales
-> FROM payment
-> WHERE year(payment_date) = 2005
-> GROUP BY quarter(payment_date), monthname(payment_date);
```

# Localized sorting

Along with partitioning a result set into windows, you can also define sort order

```
mysql> SELECT quarter(payment_date) quarter,
-> monthname(payment_date) month_nm,
-> sum(amount) monthly_sales,
-> max(sum(amount))
-> over () max_overall_sales,
-> max(sum(amount))
-> over (partition by quarter(payment_date)) max_qrtr_sales
-> rank() over (order by sum(amount) desc) sales_rank
-> FROM payment
-> WHERE year(payment_date) = 2005
-> GROUP BY quarter(payment_date), monthname(payment_date);
```

# Ranking

There are several ranking functions.

1. row_number - returns a unique number for each row, with rankings arbitrarily assigned incase of a tie.
2. rank - returns the same ranking in case of a tie, with gaps in the rankings.
3. dense_rank - returns the same ranking in case of a tie, with no gaps in the rankings.

```
mysql> SELECT customer_id, count(*) num_rentals,
-> row_number() over (order by count(*) desc) row_number_rnk,
-> rank() over (order by count(*) desc) rank_rnk,
-> dense_rank() over (order by count(*) desc) dense_rank_rnk
-> FROM rental
-> GROUP BY customer_id
-> ORDER BY 2 desc;
```

## Generating multiple rankings

```
mysql> SELECT customer_id,
-> monthname(rental_date) rental_month,
-> count(*) num_rentals,
-> rank() over (partition by monthname(rental_date) order by count(*) desc) rank_rnk
-> FROM rental
-> GROUP BY customer_id, monthname(rental_date)
-> ORDER BY 2, 3 desc;
```

# Reporting functions

Instead of a group by clause, you can use aggregate functions (min, max, sum, count) paired with an over clause to generate sums or averages across an entire dataset.

```
SELECT monthname(payment_date) payment_month, amount,
sum(amount) over (partition by monthname(payment_date)) monthly_total,
sum(amount) over () grand_total
FROM payment
WHERE amount >= 10
ORDER BY 1;
```
