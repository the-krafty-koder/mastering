# Web crawler

- Used to discover new or updated web content.
- Has many purposes:
  1. Search engine indexing
  2. Web archiving
  3. Web mining
  4. Web monitoring for copyright infringement

# Functional requirements

1. Should only crawl HTML content
2. Should consider newly added or edited web pages.
3. Store HTML pages crawled for upto 5 years.
4. Should ignore pages with duplicate content.

# Non functional requirements

1. Should scale easily.
2. Should be robust.
3. Should be extensible to support new content types.
4. Shouldn't make too many requests within a short period of time.

# High level design

                                DNS Resolver                        Content storage
                                        |                                   >
    Seed urls --> URL Frontier --> HTML Downloader --> Cntnt parser --> Cntnt seen ?
                                        <                                       |
                                        |                                       >
                                        |                            Link extractor
                                        |                                       |
                                        |                                        >
                                        |                                URL Filter
                                        |                                        |
                                        |                                        >
                                         <-------------------------------- URL seen
                                                                                |
                                                                                >
                                                                        URL Storage

1. Seed URLS
   Used as a starting point for the crawling process eg to crawl all pages from a university website, use the university domain as the seed url.
2. URL Frontier
   Splits the crawl state into 2: downloaded and to be downloaded.
3. HTML Downloader
   Downloads webpages from the internet.
4. DNS Resolver
   HTML Downloader calls the DSN Resolver to get the IP address of the URL
5. Content parser
   Parses and validates downloaded web pages.
6. Content seen
   Removes duplicated content
7. Content storage
   Stores HTML Content
8. Link extractor
   Parses and extracts links from HTML Pages.
9. URL Filter
   Excludes certain blacklisted content
10. URL Seen
    Keeps track of visited URLS
11. URL Storage
    Stores already visited URLS

Step 1: Add seed URLs to the URL Frontier
Step 2: HTML Downloader fetches a list of URLs from URL Frontier.
Step 3: HTML Downloader gets IP addresses of URLs from DNS resolver and starts
downloading.
Step 4: Content Parser parses HTML pages and checks if pages are malformed.
Step 5: After content is parsed and validated, it is passed to the “Content Seen?” component.
Step 6: “Content Seen” component checks if a HTML page is already in the storage.
• If it is in the storage, this means the same content in a different URL has already been
processed. In this case, the HTML page is discarded.
• If it is not in the storage, the system has not processed the same content before. The
content is passed to Link Extractor.
Step 7: Link extractor extracts links from HTML pages.
Step 8: Extracted links are passed to the URL filter.
Step 9: After links are filtered, they are passed to the “URL Seen?” component.
Step 10: “URL Seen” component checks if a URL is already in the storage, if yes, it is
processed before, and nothing needs to be done.
Step 11: If a URL has not been processed before, it is added to the URL Frontier.

# Design deep dive

1. DFS vs BFS

- DFS is not a good choice because depth of DFS can be large
- BFS is commonly used and is implemented in a FIFO queue.

2. URL Frontier

- Helps adress the problem where a crawler is sending too many requests in parallel to a single domain.

  1. Politeness

  - Download one page at a time from the same host. A delay can be added between 2 download tasks.
  - Map website hostnames to worker threads. Each thread has a seperate FIFO queue that only downloads URLs obtained from that queue.

  2. Priority

  - Prioritise URLS based on usefulness which can be measured by page rank or website traffic

  3. Freshness

  - Recrawl based on webpages update history.
  - Prioritise URLs and recrawl important pages first.

3. HTML Downloader

- Downloads webpages based on HTTP protocol
- Robots.txt -> standard used by website to communicate with crawlers, specifying what pages crawlers are allowed to crawl

  Perfomance optimization

  - Crawl jobs are distributed to multiple servers and each server runs multiple threads.

                             ----> HTML Downloader
                            |
            Frontier ------- ----> HTML Downloader
                            |
                             ----> HTML Downloader

  - Cache DNS resolver to reduce request response times.
  - Distribute crawl servers geographically.
  - Have a short timeout so that if server doesnt respond, crawler crawls some other pages.

  Robustness optimization

  - Consistent hashing to distribute load amongst HTML downloaders. Adding and removing downloaders will therefore be effective.
  - Graceful error handling
  - Data validation to prevent system errors.

4. Detect and avoid problematic content

- Set a maximum url length to avoid spider traps ( a web page that causes a crawler to be in infinite loop)
- Filter noise ( eg ads, code snippets)
