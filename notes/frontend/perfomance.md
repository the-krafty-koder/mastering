# Web workers

A way for web content to run scripts in background threads.
`const myWorker = new Worker("script.js") `

# Service workers

Useful for caching. You can set up an app to use cached assets first, providing an offline experience, before then fetching data from the server.

# Hydration

Attaching event listeners, interactions and state on the client side using Javascript to pre-rendered HTML pages. Often used in SSR.

Partial hydration - only hydrate interactive parts of the page.

## Advantages of hydration.

    1. Faster load times.
    2. SEO friendly as search engines can crawl pre-rendered content.
    3. Enables progressive enhancement ( basic content is loaded before complex ones)

# Pagination

Determines the number of items to display on a page

## Types of pagination

    1. Offset based pagination - uses an offset to specify where to start retrieving from and a limit to determine size (page * size)
        Disadvantages
        1. Inaccurate page results for data that updates frequently.
        2. Page size cannot be easily changed.
        3. Query perfomance degrades over time.

    2. Cursor based pagination - uses a pointer to a specific record on the db. "Give me 5 items starting after [specific item].". The cursor is usually a unique identifier, which can be the item id, timestamp, or something else. Subsequent requests use the identifier of the last item as the cursor to fetch the next set of items
        Advantages
        1.More efficient and faster on large datasets.
        2.Avoids the inaccurate page window problem because new posts added over time do not affect the offset, which is determined by a fixed cursor

        Disadvantages
        1. Since the client doesnt know the cursor, it cant jump to specific pages without going through previous pages
        2. More complex to implement.

# Improving SEO

1. Including keywords in the content.
2. Using heading tags correctly.
3. Creating and submitting a sitemap
4. Internal linking between pages.
5. Building backlinks to your site.
6. Optimize images, eg resizing and compressing
7. Optimize the site loading speed.
8. Responsive design to improve user experience.

# Web perfomance optimization techniques

Frontend

1. Virtualization
   Only the currently visible items in a list is rendered. Reduces initial and subsequent loading times. Smoother scrolling and interaction as well as the page is not overloaded.
2. Code/Bundle splitting
   Dividing a large codebase into chunks and loading only the necessary chunks when required.
3. Dynamic imports/ Lazy loading
   Import code only on interaction / initiliaze object only when required by the users
4. Optimize the loading sequence
   Prioritize the loading of essential resources first before content. Use `<link rel='preload>` for critical resources in the <head>
5. Compression
   Compress static assets eg images, minify css and js files
6. Tree shaking
   Removes unused code from the final bundle before deployment
7. Pagination
   Fetch a limited set of data per page

Javascript

1. Defer/ asynchronously load non-essential JS
   Move non-critical scripts until after initial load

2. Optimize React/Vue apps
   - Memoize components with expensive computations.
   - Use <Suspense> to keep users engaged while page loads.
   - Avoid unnecessary rerenders

Network

1. CDN
   Deliver static assets via a CDN to reduce load times.
2. Caching
   Use service workers for asset and API caching. Employ HTTP caching as well (Cache-Control headers)
