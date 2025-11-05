# Feed publishing

                                    Client
                                       |
                                  Load balancer
                                       |
                                   Web servers
                                       |
                Post service --------------------------- Notification service
                     |                 |
                  Post cache       Fanout service ------------ Graph DB
                     |                 |                |
                  Post DB          Message Queue         >------User cache--->User DB
                                       |
                                   Fanout workers
                                       |
                                   News Feed Cache

Summary of the fanout service:

1. Fetch friend IDs from a graph database optimized for managing relationships.
2. Retrieve and filter friend info from the user cache, respecting user settings (e.g. mutes, selective sharing).
3. Send friend list and post ID that has just been saved to a message queue.
4. Fanout workers process the queue and update the news feed cache with <post_id, user_id> pairs, storing only IDs to conserve memory.
5. News feed cache holds a limited number of recent post-user mappings, optimizing for low cache miss rates.

# Feed retrieval

                           Client
                              |
                         Load balancer
                              |
                          Web server
                              |
                        News Feed Service --------- User cache ------ User DB
                              |                |
                        News Feed Cache         -- Post cache ------ Post DB

Summary of news feed retrieval:

- User requests their news feed via /v1/me/feed.
- Load balancer routes the request to a web server.
- Web server calls the news feed service.
- News feed service fetches post IDs from the news feed cache.
- It then retrieves full user and post data from caches to build a complete feed.
- The fully constructed feed is returned in JSON format for client display.
