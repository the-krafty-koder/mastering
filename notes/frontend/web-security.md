# Web security

The act of protecting websites from unauthorized use, modification, access or disruption.

## Web security threats

    ### Cross site scripting ( XSS )
    An attack that allows client side scripts to be injected into the user's browser via the site.

    ### SQL Injection
    Enables malicious users to execute SQL code into a database, allowing data access / modification.

    How to prevent SQL injection attacks
    1. Use parameterized queries -> write queries leaving placeholders for where data is supposed to go, and then provide this data elsewhere.
    2. Use ORMS - abstract away writing raw SQL and handle escaping and parameterization for you.
    3. Escaping data -> escape special characters while writing SQL queries manually.

    ### Cross Site Request Forgery (CSRF)
    Allows a user to mimic another user by using their credentials

    ### Clickjacking
    A malicious user hijacks clicks meant for a site and redirects them to
    another site.

    ### Denial of Service
    Target site is flooded with fake requests so that it becomes unusable for intended users.

## Cross origin resource sharing (CORS)

A mechanism that allows a server to indicate origins other than its own thats allowed to serve resources to

## Content Security Policy (CSP)

A series of instructions from a website to a browser, instructing the browser to place restrictions on the things the code in thes site can do.
Used to prevent XSS attacks. A CSP can have other purposes as well, including defending against clickjacking and helping to ensure that a site's pages will be loaded over HTTPS.

# How to ensure security of code

1. Input validation
2. Implementing role based access control to parts of the code.
3. Perfoming regular code audits (dependencies, libraries etc).
4. Avoid exposing secrets -> using env variables.
5. Having an incident response plan
6. Encrypting data that flows into and out of your code

# How to ensure perfomance and scalability of code

1. Embrace a modular and clean architecture
2. Choose the right DSA
3. Implement effective caching strategies.
4. Continous monitoring
5. Embrace asynchronous programming.
