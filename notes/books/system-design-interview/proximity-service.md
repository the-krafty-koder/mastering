# Functional requirements

1. Return all businesses based on a user's location
2. Business owners can CRUD a business
3. Customers can view detailed info about a business

# Non-functional requirements

1. Low latency - users should be able to see businesses quickly.
2. Data privacy - location info is sensitive data.
3. High availability and scalability requirements

# Data model

Read volume is high because searching for a business and viewing business info is more frequent than adding biz info.

- Use MySQL/Postgres since it is a read-heavy system with relational data (business tables and geo-index table).

# High level design

                    Client
                      |
                      |
    Location Based ---------- Business service
    Service (LBS)                           |
        |                                   |
        |                                   |
         --------Replica Replica Primary-----

LBS - Finds nearby businesses for a given radius and location

# Search algorithms in LBS

1. 2D Search - Use lat and long ranges and find all businesses within those ranges. Use indices to better perfomance. Still inefficient because youll have to find the intersection of 2 datasets (which could be large) for the results.

2. Evenly divided grid
   Divide the world into small grids

3. Geohash

- Recursively divide the world from lat/lon space into four quadrants.
- Second, divide each grid into four smaller grids. Repeat this subdivision until the grid size is within the precision desired.
- Convert the position of each grid into a binary string.
- Convert the binary string into base32 characters.
- For searching convert lat, long into binary -> base32 then return the 8 neighbors of the position.

4. Quadtree

#
