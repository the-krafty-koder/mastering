# Gaming leaderboard

Leaderboards are used to show who is leading in a particular game.

# Functional requirements

1. Display top 10 players on the leaderboard.
2. Show a users specific rank.
3. Display users who are 4 places above and beyond a specific user.

# Non functional requirements

1. Real time update on scores.
2. Score update is reflected on the leaderboard in real time
3. General scalability, availability and reliability requirements.

# High Level Design

                       User
                        |
          Win a game    | Get leaderboard / player rank
        ---------------  --------------------
        |                                   |
        >                                   >
        Game service  ------------>  Leaderboard service
                                            |
                                            |
                                            >
                                       Leaderboard store

1. When a player wins a game, the client sends a request to the game service.
2. The game service ensures the win is valid and calls the leaderboard service to update the score.
3. The leaderboard service updates the user’s score on the leaderboard store.
4. A player makes a call to the leaderboard service directly to fetch leaderboard data, including: top 10 leaderboard.the rank of the player on the leaderboard.

N/B
If the data is used in other place or supports multiple functionalities eg analytics, then it makes sense to add a message queue between the game service and leaderboard service.

                                    Leaderboard service
                                    >
                                    |
        Game service ---> Kafka ----> Analytics service
                                    |
                                    >
                                    Notification service

# API Design

We need 3 APIs

1. POST v1/scores -> should be an internal API only called by game servers to update a user's position when they win a game.
2. GET v1/scores -> get the top 10 players
3. GET v1/scores/{user_id} -> fetch the rank of a specific user.

# Data model

1. SQL

- If the scale is small and users are few, a relational DB eg SQL can be used.
- Each monthly leaderboard is represented by a table containing user ID and score columns.
- When the user wins a match, either award the user 1 point if they are new, or increase their existing score by 1 point
- To determine ranking, sort the table in descending order.

  Problem

  - SQL DBs are not performant when we have to process large amounts of continously changing information.

2. Redis

- Redis allows fast reads and writes since data is stored in memory. It has a specific data type called sorted sets that are ideal for solving leaderboard system design problems
- A sorted set is a data type similar to a set. Each member of a sorted set is associated with a score. The members of a set must be unique, but scores may repeat. The score is used to rank the sorted set in ascending order.
- Sorted sets are more perfomant because each element is positioned in the right order during insertion or update, and the complexity of an add or find operation is O(logn)

  Operations

  1. ZADD: insert the user into the set if they don’t yet exist. Otherwise, update the score for the user. It takes O(log(n)) to execute.
  2. ZINCRBY: increment the score of the user by the specified increment. If the user doesn’t exist in the set, then it assumes the score starts at 0. It takes O(log(n)) to execute.
  3. ZRANGE/ZREVRANGE: fetch a range of users sorted by the score. You can specify the order (range vs. revrange), the number of entries and the position to start from. This takes O(log(n)+m) to execute, where m is the number of entries to fetch (which is usually small in our case), and n is the number of entries in the sorted set.
  4. ZRANK/ZREVRANK: Fetch the position of any user sorting in ascending/descending order in logarithmic time.

- For storage requirements, one modern redis server is able to hold all the data from back envelope estimations.For persistence redis does support persistence. We can also add a read replica so that if the main server fails, the other takes over.

  Scaling redis

  - We can apply sharding to scale.
  - 2 Options

    1. Fixed partition

    - Break up the data by range (0-100, 100-200) and store in different shards
    - In order to know which shard to update scores on during insertion or update, store a mapping of user_id: score in a secondary cache.
    - To fetch top 10 players, fetch the top 10 highest from the last shard (900-1000)

    2. Hash partition

    - Use hash partitioning to determine which redis cluster a user's data is in
