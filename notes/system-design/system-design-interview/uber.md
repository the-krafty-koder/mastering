# Design Uber

# Functional requirements

- Users should enter start and destination and get fare estimations.
- Users should request rides based on data above.
- Upon request, riders should be matched with closest drivers.
- Drivers should accept/reject rides.

# Non-functional requirements

- Low latency when matching
- Scalability
- Consistency
- Security

# High level design

                    Client
                       |
                       |
                  Load balancer
                       |                        Drivers
                       |                            |
                       |                            |
                       |                         3rd party SMS service
                       |                            |
                      API -----> MQ -----> Notification service
                       |
     Location   ---------------  Ride matching service
      service          |
                       |
                    Ride service ---> 3rd party mapping service


    1. Location service -> collects location data from drivers and stores it in a DB.
    2. Ride matching service -> uses algorithms to match drivers based on ratings, proximity and availability.
    3. Notification service -> sends notifications to drivers when a new ride request is matched to them.
    4. Ride service -> calculates route and estimates fare
    5. API -> performs rate limiting and authentication

# Flow

Fare estimate

1. Rider enters start and destination
2. Request is routed to the Ride service which uses 3rd party mapping service to estimate trip time then generates fare.
3. Ride service creates a new Fare entity in DB then returns fare to client.

Requesting ride

1. POST request is sent to API when a user confirms and requests ride.
2. Ride object is created on DB then a match is initated via matching service.
3. Matching service queries Location service for drivers nearby then uses algos to match drivers.
4. Once driver is matched, notification is sent via MQ
5. Driver accepts/rejects and sends a request to the ride service via API.
6. Ride service updates the ride object and returns pickup location.

# Database

- System requires high write frequency and high query efficiency
- Best to use Redis which supports geospatial data types and enable persistence using RDB (Redis Database) or save to disk periodically
- Use geohashing to encode lat and long values into a single key.

# Deep dive

1. Location accuracy vs system overload

- Use adaptive location update intervals. Driver's client uses algorithms to determine the best intervals for sending location data. If the driver is stationary or moving slowly, no need for frequent updates

2. Multiple ride requests

- Need to prevent simultaneous ride requests from getting to drivers.
- Implement a distributed lock mechanism with TTL on Redis based on driverId as key. When a request arrives, a lock is created with driver ID and stored in Redis with a TTL of 10s. If driver doesnt accept within 10s or rejects , lock is freed.

3. Dropped ride requests

- Use a message queue with dynamic scaling.
