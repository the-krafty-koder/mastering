# Authentication

Involves verifying the claimed identity of a user.

# Authentication types

1. Basic authentication - involves verifying username and password. Hash passed password and compare with hashed password in DB. (eg use bcrypt)

2. Token based - generate a token after basic auth that will be used for subsequent requests.

3. Biometric - verify identity using biological features eg fingerprint.

4. OAuth - an app delegates authentication to a third service.

5. SSO (Single Sign-On) - one login for many systems (e.g., Google Workspace login works for Gmail, Docs, etc.).

# Authorization

Verifying if user has permissions to perform an action.

## Access control policies (authorization techniques)

3 approaches can be followed when considering the protection of an application

1. Concentrating on the protection of the data associated with the application
2. Protection by specifying exactly which operations can be carried out, and by whom
3. Focus directly on users by taking measures by which only specific people have access to the application, irrespective of the operations they want to carry
   out.

Access control policies can be grouped into:

1. Mandatory Access Control - a central admin decides who gets access to what
2. Discretionary Access Control - the owner of an object can change access rights
3. Role based Access Control - users are not authorized based on identity but on the roles they have within the organization
4. Attribute Based Access Control - attributes of the users and the objects they want to access are used to determine access

# Summary of OAuth 2.1 Framework

OAuth 2.1 defines four key roles:
Resource Owner – Typically the user (e.g., Alice).
Client – An application acting on behalf of the user (e.g., an email app).
Resource Server – Hosts the user’s data and checks access rights.
Authorization Server – Issues access tokens to clients after verifying the user's consent.

Authorization Flow
The client registers with the authorization server and gets a unique ID (cid).
To request access, it sends [cid, R, H(S)], where R is the rights requested and H(S) is a hash of a secret S.
If the user (Alice) isn’t logged in, she must authenticate and approve the request.
The server then sends back a temporary authorization code (AC).
The client uses [cid, AC, S] to exchange it for an access token (AT).
The server checks H(S) matches the earlier request, confirming it's the same client, and gives it an access token.

OAuth 2.1 defines two types of access tokens:

1. Opaque tokens – Simple identifiers; the resource server must contact the authorization server to verify the client's access rights each time the token is used.

2. Self-contained (signed) tokens – Tokens that embed all access rights directly and are signed by the authorization server; they include an expiration time and don’t require the resource server to check back with the authorization server.

# Simpler version

OAuth 2.0 is an authorization framework that lets third-party applications access a user's data from another service without requiring the user's password. It’s not authentication by itself, but it is often used for login when combined with OpenID Connect.

In this flow, the user is redirected to the authorization server (e.g., Google) to log in and approve access. The server then redirects back to the app with an authorization code. The app exchanges this code for an access token (and optionally a refresh token). The access token is then used to access protected resources via API.

Access tokens are short-lived, and refresh tokens can be used to get new ones without user interaction. Tokens must be kept secure and are sent with API requests using the Bearer scheme.

# Session based authentication

Session-based authentication is a server-managed way to keep users logged in. After a user logs in with valid credentials, the server creates a session and stores it in memory or a database, assigning it a unique session ID. This ID is sent to the client in a secure cookie (HttpOnly, Secure) and is included automatically with future requests.

Each time a request comes in, the server reads the session ID from the cookie, looks it up in storage, and retrieves the associated user info. Sessions can expire after a set time, be refreshed on activity, or be manually invalidated (e.g., on logout).

Session-based auth is easy to implement, secure by default (since data stays on the server), and works well for traditional web apps. However, it doesn’t scale as easily in distributed systems unless shared session storage like Redis is used. Unlike token-based systems like JWT, session-based auth is stateful and better suited to server-rendered applications.
