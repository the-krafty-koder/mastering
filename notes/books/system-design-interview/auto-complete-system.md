# Auto-complete system

System is broken down into:

1. Data gathering service - gathers user input queries and aggregates them in real time.
2. Query service - given a search query, return top 5 most frequently accessed items.

- A trie data structure is used as storage to store most frequently accessed queries.
  The top k most frequently used queries are stored in each node.

      Example
                      Root
              /       |       \
              s        c        b
              /         |         \
            ma         ar         be
          /   \      /  \       /   \
          r    p     ti   ch    st    ll
          /|    |    /|    |    /|    /|
      ai  ke  la  clea  che  stoc  bill

## Data gathering service

                                                            Trie cache
                                                                |

Analytics -> Aggregators -> Aggregated Data -> Workers -> Trie DB
Logs

Analytics logs - stores raw data about search queries. Logs are append only and not indexed.

                    Sample
                    data        time
                    tree        2019-10-1 22:00:00

Aggregators - aggregate data so it is easily processed by the system.
Aggregated data - sample shown below:

                    query       time        frequency
                    tree      2019-10-1         2000

Workers - perform asynchronous jobs at intervals. They build the trie data structure and store it in the trie db
Trie cache - distributed cache system that keeps the trie in memory for fast reads.
Trie DB - persistent storage for the trie. 2 options for storage:

    1. Document store: Since a new trie is built weekly, we can periodically take a snapshot of it,
    serialize it, and store the serialized data in the database. Document stores like MongoDB [4]
    are good fits for serialized data.
    2. Key-value store: A trie can be represented in a hash table form [4] by applying the
    following logic:
    • Every prefix in the trie is mapped to a key in a hash table.
    • Data on each trie node is mapped to a value in a hash table

## Query service

                            User
                              |
                              |
                        Load balancer
                              |
                              |
                          API Servers
                              |
                              |
                         Trie Cache  ------> Trie DB

1. A search query is sent to the load balancer.
2. The load balancer routes the request to API servers.
3. API servers get trie data from Trie Cache and construct autocomplete suggestions for
   the client.
4. In case the data is not in Trie Cache, we replenish data back to the cache. This way, all
   subsequent requests for the same prefix are returned from the cache. A cache miss can
   happen when a cache server is out of memory or offline.

Optimizations

1.  AJAX request - for web apps, browsers should send AJAX requests to avoid refreshing the page.
2.  Browser caching - tree data should be cached on browser to avoid frequent access to API servers.

## Trie operations

Create - created by workers from aggregated data.
Update - update the trie weekly. Once new is available, old one is discarded.
Delete - add a filter layer between API server and trie cache to filter out unwanted suggestions.

# Scaling

Shard the database using prefix key. Eh a-m in one server and m-z in another server.
