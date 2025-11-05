# Functional requirements

- User can start an auction
- User can view and place bid on auction, also get updates on current highest bid.
- Auction is closed when there is no bid for 1 hour.
- Auction winner receives notification and has 10 min to make payment.

# Non-functional

- High availability
- High scalability
- Low latency
- Eventual consistency for bidding part.
- 1B DAU.

# Clarification questions

- multiple bidders with same price? 1st bidder wins
- di we allow users to place multiple bids for same auction?
- do we record all bids users placed during the auction?

# High level design

                            Client <----------------------------------------------
                                |                                                  |
                            Load balancer                                          | WS
                                |                                                  |
          Payments  <--------- API ----------------> Bidding ---> MQ --> Workers ---
           service              |                    service               |
                        Auction service                 |              Scheduling service
                                |                       DB                 |
                    Auction DB---------Cache  <----------------------------
                        |
                       CDC ---> Notification service -> 3rd party APIs
