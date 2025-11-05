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

1. The user initiates the flow by doing something like clicking a button (hosted by the app) to connect and share their Google Calendar.
2. The app sends an authorization request to the authorization server.
3. The authorization server redirects the user to authenticate and agree with granting the app the permissions it asked for (e.g., view your Google Calendar).
   Upon successful authentication, the user grants permission.
4. The authorization server generates an authorization code and sends it back to the app, as the response of the authorization request initiated in step 2.
5. The app sends a new request to the authorization server, providing as input the authorization code and asking for an access token in return.
6. The authorization server verifies the code and generates an access token (and optionally a refresh token).
7. With the access token, the app can request resources from the resource server.

OAuth 2.1 defines two types of access tokens:

1. Opaque tokens – Simple identifiers; the resource server must contact the authorization server to verify the client's access rights each time the token is used.

2. Self-contained (signed) tokens – Tokens that embed all access rights directly and are signed by the authorization server; they include an expiration time and don’t require the resource server to check back with the authorization server.

# Session based authentication

Session-based authentication is a server-managed way to keep users logged in. After a user logs in with valid credentials, the server creates a session and stores it in memory or a database, assigning it a unique session ID. This ID is sent to the client in a secure cookie (HttpOnly, Secure) and is included automatically with future requests.

Each time a request comes in, the server reads the session ID from the cookie, looks it up in storage, and retrieves the associated user info. Sessions can expire after a set time, be refreshed on activity, or be manually invalidated (e.g., on logout).

Session-based auth is easy to implement, secure by default (since data stays on the server), and works well for traditional web apps. However, it doesn’t scale as easily in distributed systems unless shared session storage like Redis is used. Unlike token-based systems like JWT, session-based auth is stateful and better suited to server-rendered applications.
