# High level design

                  Client ------------------------------
                    |                                 |
                    |                                 |
                    >                                 | long polling
        Block<----Load balancer                       |
        Server      |                                 |
        |           |                                 |
        |           |                                 |
        >           |                                 >
    Cloud storage-->|                       Notification service ----> Offline bkup q
        |           |
        |           |
        >           |
    Cold storage    |
                    |
                    >
                API Servers
                    |
        Metadata <-----------> Metadata cache
        DB

Block servers - upload blocks to cloud storage
Cloud storage - a file is split into smaller blocks and stored.
Cold storage - a computer system designed for storing inactive data, meaning
files are not accessed for a long time.
API Server - user authentication, downloading and file revision history requests.
Metadata DB - store user metadata, login info, file info
Metadata cache: Some of the metadata are cached for fast retrieval.
Notification service -> It is a publisher/subscriber system that allows data to be transferred from notification service to clients as certain events happen
Offline backup queue -> If a client is offline and cannot pull the latest file changes, the offline backup queue stores the info so changes will be synced when the client is online.
