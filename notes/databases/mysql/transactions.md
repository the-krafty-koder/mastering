# Transaction

A mechanism used to group SQL statements together such that either all or none of the stataments succeed.

# Locking

The mechanism the server uses to handle simultaneous access of data.

Locking strategies

1. Database writers must request and receive from the server a write lock to modify data and database readers must request and receive a read lock to query data. While multiple users can read data simultaneously, only one write lock is given and read access is blocked.

2. Database writers must request and receive from the server a write lock to modify data, but readers do not need any kind of lock to query data. The server ensures the readers see a consistent view of the data (even though others are making modifications) from the time her query begins until it finishes.

# How to lock an application

1. Table lock - keep users from modifying the same table simultaneously
2. Page locks - keep multiple users from modifying the same page of a table ""
3. Row locks - keep users from modifying the same row simultaneously.
