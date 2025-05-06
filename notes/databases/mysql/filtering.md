# Using the not operator

Used with the not operator to negate the where clause

`select * from customer where not first_name = 'Smith';`

a simpler and better way to write it

`select * from customer where first_name <> 'Smith';`

# Range conditions

Used to check whether an expression falls within a certain range

`select customer_id, rental_date from rental where year(rental_date) >= '2005' and year(rental_date) <= '2006';`

## Using between ( always specify the lower range first)

upper and lower limit are included in the result
`select customer_id, rental_date from rental where year(rental_date) between '2005' and '2006';`

# Matching conditions

Using wildcards "\_"

a "\_" - represents a single character

a "\*" represents multiple characters

`select title, rating from film where title like '_A%'`;

# Null

Indicates the absence of a value

IS NULL used to filter for null values;
`SELECT rental_id, customer_id FROM rental WHERE return_date IS NULL;`
