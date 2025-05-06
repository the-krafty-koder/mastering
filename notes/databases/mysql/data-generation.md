# String types

Char - holds fixed length strings
Varchar - holds variable length strings
Text - holds large variable length strings

# Truncating text

`SET sql_mode = 'ANSI'` if you want sql to truncate text stored in a string field

# Escaping strings

Use a single quote or backslash to escape strings
`UPDATE string_tbl SET text_fld = 'This isn''t text data'`

# Manipulating strings

- Use LENGTH(<column_name>) to find length of values
  `mysql> SELECT LENGTH(char_fld) char_length, LENGTH(varchar_fld) var_length, LENGTH(text_fld) text_length FROM string_tbl;
+-------------+------------+-------------+
| char_length | var_length | text_length |
+-------------+------------+-------------+
|          28 |         28 |          28 |
+-------------+------------+-------------+
1 row in set (0.002 sec)
`
- Use POSITION() to find the position of a substring
  `mysql> SELECT position('characters' in varchar_fld) FROM string_tbl;
+---------------------------------------+
| position('characters' in varchar_fld) |
+---------------------------------------+
|                                    19 |
+---------------------------------------+
1 row in set (0.002 sec)
`
- USE LOCATE() to indicate where the search for position should start.
  `mysql> SELECT LOCATE('is', varchar_fld, 5) FROM string_tbl;
+------------------------------+
| LOCATE('is', varchar_fld, 5) |
+------------------------------+
|                           13 |
+------------------------------+
1 row in set (0.002 sec)
`

# Appending characters.

- Use CONCAT(<field_name, string>) to append string to value in the field name.
  Another use is to build a string from individual pieces of data. For example, the following query generates a narrative string for each customer:

  `mysql> SELECT concat(first_name, ' ', last_name,
-> ' has been a customer since ', date(create_date)) cust_narrative
-> FROM customer;
`

# Numeric data

Most arithmetic operations are supported, example

```
mysql> SELECT 45 / 5;
+--------+
| 45 / 5 |
+--------+
| 9.0000 |
+--------+
1 row in set (0.005 sec)
```

Modulo

```
mysql> SELECT MOD(10,4);
+-----------+
| MOD(10,4) |
+-----------+
| 2 |
+-----------+
1 row in set (0.02 sec)
```

Power

```
mysql> SELECT POW(4,5);
+----------+
| POW(4,5) |
+----------+
|     1024 |
+----------+
1 row in set (0.004 sec)
```

Ceil and floor to round up and off respectively

```
mysql> SELECT CEIL(7.984), FLOOR(4.321);
+-------------+--------------+
| CEIL(7.984) | FLOOR(4.321) |
+-------------+--------------+
|           8 |            4 |
+-------------+--------------+
1 row in set (0.004 sec)
```

Using round(), any number whose decimal portion is halfway or more between two
integers will be rounded up, whereas the number will be rounded down if the decimal
portion is anything less than halfway between the two integers.

```
mysql> SELECT ROUND(72.49999), ROUND(72.5), ROUND(72.50001);
+-----------------+-------------+-----------------+
| ROUND(72.49999) | ROUND(72.5) | ROUND(72.50001) |
+-----------------+-------------+-----------------+
| 72 | 73 | 73 |
+-----------------+-------------+-----------------+
1 row in set (0.00 sec)
```

# Temporal data

Use STR_TO_DATE to convert a string into a date that can be saved in the db;
`UPDATE dates SET curr_date = STR_TO_DATE('September 17, 2019', '%M %d, %Y');`

Use CURR_DATE, CURR_TIME, CURR_TIMESTAMP for current datetime
`mysql> SELECT CURRENT_DATE(), CURRENT_TIME(), CURRENT_TIMESTAMP();`

Use DATE_ADD to add a date to another and generate a new date.
`mysql> SELECT DATE_ADD(CURRENT_DATE(), INTERVAL 5 DAY);`

Interval could be of type:
second Number of seconds
minute Number of minutes
hour Number of hours
day Number of days
month Number of months
year Number of years
minute_second Number of minutes and seconds, separated by “

- Use DAYNAME to determine which day of the week a day falls in
  `SELECT DAYNAME('2022-01-01');`

- Use extract to return specific value you need from a date
  `SELECT extract( DAY FROM '2022-01-11');`

- Use DATEDIFF to get interval between two dates. Time of day is not used to  
   determine intervals
  `SELECT DATEDIFF('2019-09-03', '2019-06-21');` // returns no. of days between
