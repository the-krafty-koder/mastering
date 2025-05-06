# Inner join

Joining data from 2 tables using data from a single column that exists in both tables

`select c.first_name, c.last_name, a.address from customer c inner join address a on c.address_id = a.address_id;`

# Joining data from 3 tables

`select c.first_name, c.last_name, a.address, ci.city from customer c inner join address a on c.address_id = a.address_id inner join city ci on ci.city_id = a.city_id; `
