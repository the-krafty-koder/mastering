# Web security

The act of protecting websites from unauthorized use, modification, access or disruption.

## Web security threats

    ### Cross site scripting ( XSS )
    An attack that allows client side scripts to be injected into the user's browser via the site.

    How to prevent XSS
    1. Sanitizing and validating inputs
    2. Use a content security policy.

    ### SQL Injection
    Enables malicious users to execute SQL code into a database, allowing data access / modification.

    How to prevent SQL injection attacks
    1. Use parameterized queries -> write queries leaving placeholders for where data is supposed to go, and then provide this data elsewhere.
    2. Use ORMS - abstract away writing raw SQL and handle escaping and parameterization for you.
    3. Escaping data -> escape special characters while writing SQL queries manually.

    ### Cross Site Request Forgery (CSRF)
    Allows a user to mimic another user by using their credentials

    How to prevent
    1. Use CSRF tokens - a value is embedded in the page on load and this value is sent alongside a request to authenticate that the request is valid.
    2. Using FETCH headers eg SEC-FETCH-SITE which tells the server whether a request is same-origin, cross site or same site.

    ### Clickjacking
    A malicious user hijacks clicks meant for a site and redirects them to
    another site.

    How to prevent clickjacking
    1. Use X-Frame-Options header to prevent embeddings into iframes.
    2. Use content security policy frame-ancestors directive.

    ### Denial of Service
    Target site is flooded with fake requests so that it becomes unusable for intended users.

    How to prevent
    1. Rate limiting
    2. Web application firewall to ban malicious traffic
    3. Captcha and BOT protection
    4. Use DDOS protection service eg Cloudflare.
    5. Caching to prevent exhausting the web server.
    6. Minimising the number of services exposed to the public web.

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
6. Follow coding conventions
7. Testing and CI/CD

# TLS and HTTPS

- TLS is a security protocol to facilitate privacy and data security for communications over the internet. It evolved from a previous encryption protocol called SSL.
- HTTPS is an implementation of the TLS encryption on top of the HTTP protocol.

## What TLS does

1. Encryption - hides data being transferred from 3rd parties.
2. Authentication - ensures parties are who they claim to be.
3. Integrity - verifies that data has not been tampered with.

## TLS Certificate (also SSL certificate)

For a website/app to use TLS, it must have a certificate installed on its origin server.It is issued by a certificate authority to the person/business that owns the domain. The certificate contains important info about who owns the domain, along with the servers public key.

## How TLS works

TLS Handshake

1. Client initiates handshake by sending a hello message to server. The message will include a client random
2. Server responds with a message containing the server's SSL certificate and server random.
3. Authentication - client verifies the SSL certificate with the certificate authority that issued it.
4. The client sends a secret encrypted with the server's public key obtained from the SSL certificate.
5. The server decrypts the secret.
6. Both client and server generate session keys from the secret, client random and server random.
7. Client and server send each other finished messages encrypted by the session key.

✅ Best Practices for API Key and Token Security

1. Never expose them publicly
   Do not commit keys or tokens to GitHub or store them in frontend code.
   Use .env files or secure secret managers (AWS Secrets Manager, HashiCorp Vault).

2. Use HTTPS
   Always use HTTPS to encrypt data in transit. Never allow API access over plain HTTP.

3. Limit Scope and Permissions
   Apply the principle of least privilege:
   An API key should only have access to what it needs.
   OAuth tokens can include scopes (e.g., read-only vs. write).

4. Restrict Usage
   Restrict keys by:
   IP address
   Referrer domain (for frontend apps)
   API endpoints or methods

5. Rotate and Revoke Keys
   Periodically rotate API keys and tokens.
   If a key/token is leaked or no longer needed, revoke it immediately.

6. Rate Limiting & Monitoring
   Set rate limits on APIs to reduce damage from abuse.
   Log and monitor API usage to detect suspicious activity.

7. Short Expiry for Tokens
   Tokens should expire quickly (e.g., 15–60 minutes).
   Use refresh tokens with longer lifespans when necessary.

# Strict mode JS

- A restricted variant of JS that makes silent errors throw, disallows certain features and helps the engine optimise code.
- Enabled by use-strict at the top of the file.

1. What changes in strict mode

- Silent errors become thrown errors eg assigning to an undeclared variable.
- No implicit globals eg x=5 must be let x=5
- `this` in functions is undefined.
- Reserved words eg implements, interface, package, private, protected.
