# Functional requirements

1. Customers can reserve rooms
2. Customers pay in full when reserving a room.
3. Customers can cancel their reservations.
4. Should allow overbooking

# Non-functional requirements

1. Should support high concurrency
2. Moderate latency ( acceptable if system takes a few seconds to make the booking)

# Data model

A relational DB is best because:

1. Relational DBs work best with read-heavy and write less frequently workflow. ( Number of users that visit higher than those that make reservations)
2. RDBS provide ACID guarantees which are important to avoid double bookings, double charges etc.
3. An RDBS can easily model the data since it has lots of relationships.

# API Details

Table 7.1: Hotel-related APIs
GET /v1/hotels/ID Get detailed information about a hote
POST /v1/hotels
Add a new hotel. This API is only available to
hotel staff.
PUT /v1/hotels/ID Update hotel information. This API is only avail-
able to hotel staff.
DELETE /v1/hotels/ID Delete a hotel. This API is only available to hotel
staff.

Room-related APls
Table 7.2: Hotel-related APIs
API Detail
GET /v1/hotels/ID/rooms/ID Get detailed information about a room.
POST /v1/hotels/ID/rooms Add a room. This API is only available to hotel
staff.
PUT /v1/hotels/ID/rooms/ID Update room information. This APT is only avail-
able to hotel staff.
DELETE
/v1/hotels/ID/rooms/ID
Delete a room. This API is only available to hotel

Reservation APIs
GET /v1/reservations Get the reservation history of the logged-in user.
GET /V1/reservations/ID Get detailed information about a reservation.
POST /v1/reservations Make a new reservation.
DELETE /V1/reservations/ID Cancel a reservation.

# High level design

                                User                                        Admin
                                 |                                             |
                            Public API Gateway                           Internal API
                                 |                                              |
                                 |                           Hotel management service
             ----------------------------------------
            |           |               |           |
      Hotel service   Rate service   Reservation   Payments service
            |           |              service      |
        ---------       |               |           |
        |       |      DB               DB          DB
        DB    Cache

Admin - perform authorized ops eg refunds, cancelling, updating room info
API Gateway - direct requests to specific services based on endpoints
Internal APIs - APIs available only to staff
Hotel service - provides detailed info on hotels and rooms
Rate service - provides room rates depending on how full a hotel is
Reservation service - receives room requests and reserves rooms
Payment service = executes payments and updates reservation status to paid.
Hotel management service - only available to hotel staff.

- Most of these microservices communicate with each other eg reservation service and rate service

# Concurrency

Double booking can occur when :

1. The user clicks on the book button multiple times
2. Multiple users try to book the same item multiple times.

Solution for 1.

1. Hide the book button on client side once clicked. Users can disable javascript though so not reliable.
2. Idempotent APIs - add an idempotent key in the reservation request (eg reservation_id)

   Reservation Steps

   1. Generate a reservation order using the reservation service <-> rate service. Reservation id is generated using a globally unique id generator.
   2. Customer reviews and submits by clicking button
   3. Subsequent clicks of submit button dont cause double booking

Solution for 2.
Use a locking mechanism

1. Pessimistic locking
   Place a lock on a record as soon as a user starts updating it. Other users have to wait until the first user commits the changes.

   Disadvantages

   - Can cause perfomance problems if transaction is locked for too long.
   - Prone to deadlocks.

2. Optimistic locking
   Allows multiple concurrent users to try and update the same resource. 2 ways to implement, version_number and timestamp

   Versions

   1. A new column called version is added to the database table.
   2. Before a user modifies a database row, the application reads the version number of the row.
   3. Whewithe ger update he row: che application increases the version number by 1
   4. A database validation check is put in place; the next version number should exceed the current version number by 1. The transaction aborts if the validation fails and the user tries again from step 2.

3. Constraints
   Add a constraint on the table that checks if total-inventory - total-reserved > 0. If it fails , the transaction is rolled back.

Option 3 is best to use.

# Scalability

Use database sharding ( by hotel id) to improve scalability.

- Use a cache with TTL mechanism to expire old data automatically since it wont be used as much.

## Data consistency among servers

If youre going for a microservices approach where each service contains its own DB, one atomic operation can span many services. use 2phase commit protocol to ensure atomicity across multiple database servers.
