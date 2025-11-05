# Unique ID Generator

# Functional requirements

1. IDs must be unique.
2. IDs are numerical values only.
3. IDs fit into 64bit.
4. IDs are ordered by date.
5. Should generate over 10000 IDs per second.

# Options

1. Multi-master approach

- Uses a databases auto_increment feature. Instead of increasing by 1, increase by k (number of database servers in use)

2. UUID

- Ideal because of the low probability in getting collusions. 128 bit number.
- Each web server has a UUID generator

  Disadvantages

  1. IDs do not go up with time.
  2. IDs could be non-numeric
  3. 128 bits is long.

3. Ticket server

- Use a single database servers auto_increment feature. Centralised with web servers querying it.
- Advantages: easy to implement, numeric in nature.
- Disadvantages: single point of failure.

4. Snowflake

- Divide an ID into different sections
  • Sign bit: 1 bit. It will always be 0. This is reserved for future uses. It can potentially be used to distinguish between signed and unsigned numbers.
  • Timestamp: 41 bits. Milliseconds since the epoch or custom epoch. We use Twitter
  snowflake default epoch 1288834974657, equivalent to Nov 04, 2010, 01:42:54 UTC.
  • Datacenter ID: 5 bits, which gives us 2 ^ 5 = 32 datacenters.
  • Machine ID: 5 bits, which gives us 2 ^ 5 = 32 machines per datacenter.
  • Sequence number: 12 bits. For every ID generated on that machine/process, the sequence number is incremented by 1. The number is reset to 0 every millisecond.
