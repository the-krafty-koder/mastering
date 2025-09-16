# Twitter Search

- Goal is to create a real time system that can handle a large amount of real-time data.

# Functional requirements

1. A user can search for tweets based on keywords, hashtags,
2. Search should be near real time.
3. System should return most relevant and recent tweets.
4. Results should be paginated and sorted by relevancy.

# Non-functional requirements

1. High avalability.
2. Low latency
3. Scalability.
4. Fault tolerant.

# High level design

                            Client
                                |
                            Load balancer
                                |
                                |
                            Web server
                                |
                                |
        Indexing <--- MQ <-- Tweet service <--------> Search service
        service                |
           |                 -- ----                     |
           |                 |       |                   |
           |             Tweet DB  Redis Cache           | tweet IDs
           |                                             |
           >                                             |
        Elastic search <----------------------------------

1. Indexing service
   The indexing service uses an inverted index to map a word to a list of tweets containing that word. It does the following:

   1. Listen for new tweets from the message queue.
   2. Process the raw tweet data (tokenizing text, extracting hashtags, etc.).
   3. Format the processed data into a document that Elasticsearch can understand.
   4. Send an API request to Elasticsearch to index that document.

2. Elastic search
   Elasticsearch handles the heavy lifting of creating the inverted index entries, mapping each word to the new tweet's ID and its position.

3. Search service
   Responsible for parsing search queries and returning results. It receives the query and then breaks it down to individual search items. It then queries elastic search for tweet IDs that contain that query. Search service then retrieves tweets from the tweet DB, ranks them depending on relevance and returns them to user.

# Deep dive

1. Scalability

Twitter search needs to handle:
Millions of tweets per hour (write-heavy indexing load)
Hundreds of thousands of search queries per second (read-heavy)
How to meet it:

Sharding the index: Split the search index (e.g., Elasticsearch/Lucene) across many shards by time (recent tweets in hot shards) and user ID or tweet ID range.

Hot vs. cold storage: Keep recent tweets in fast storage/index for quick retrieval; move older tweets to cheaper, slower nodes.

Horizontal scaling: Use more index nodes as tweet volume grows.

Distributed messaging (Kafka/Pulsar) between the API Gateway and Indexing Service to decouple ingestion from indexing.

2. Low Latency / High Performance

Target: <100 ms for a search query.

How to meet it:

Precomputed search index: No full-table scans — queries hit prebuilt inverted indexes.

Query routing: Send a query only to relevant shards (via shard routing metadata).

Caching:

Query result caching (e.g., Redis) for popular queries or trends.

Metadata caching for user-follow graphs.

Fan-out on read: Search results are computed per user request by hitting only the relevant shards.

Asynchronous indexing: A tweet is searchable within seconds, but indexing happens in the background to avoid blocking the tweet post.

3. Availability

Target: 99.99% uptime.

How to meet it:

Replication: Each search index shard is replicated across multiple nodes.

Failover: If a shard/node is down, the cluster reroutes queries to a replica.

Stateless services: API Gateway, Search Service, and Indexing Service can be restarted/replaced without data loss.

Multi-region deployment: Serve users from the closest region; if one region fails, redirect traffic.

4. Reliability

Ensuring no tweets are lost and indexes remain consistent.

How to meet it:

Write-ahead logs (WAL) in the indexing pipeline before processing.

Message durability: Kafka with replication factor > 2 so tweet events survive broker failures.

Event sourcing: Keep a log of tweet creation/deletion so the search index can be rebuilt from scratch if needed.

Background consistency checks: Periodically verify that index contents match the tweet database.

5. Search Relevance & Quality

Users expect to see the most relevant tweets first.

How to meet it:

Ranking signals:

Tweet recency

User engagement (likes, retweets, replies)

Social graph proximity (tweets from people you follow)

Content type weighting (images, verified accounts, hashtags)

Learning-to-rank (LTR) models: Continuously train ranking models on engagement data.

Spell correction & synonyms: Improve recall for search queries.

Query understanding: Detect hashtags, mentions, and keywords.

6. Cost Efficiency

Twitter search is expensive — billions of documents indexed.

How to meet it:

Tiered storage: SSDs for hot data, HDDs or object storage for cold archives.

Index pruning: Drop low-value old tweets from the primary index (keep in archive index for rare queries).

Compression: Use columnar compression for inverted index storage.

7. Security

Search results must respect privacy and access rules.

How to meet it:

Access control at query time: Filter tweets based on user visibility (private/public, followers-only).

Encrypted storage: Protect tweet content at rest.

Rate limiting: Prevent abuse of search endpoints.
