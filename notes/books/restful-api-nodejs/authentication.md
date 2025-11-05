🔐 How JWT Works
✅ 1. JWT Creation (On Login)
User sends login credentials (e.g. email + password).
Server authenticates the user.
Server generates a JWT:
Encodes the header and payload.
Signs encoded header+payload using a secret (for HMAC) or private key (for RSA).
Server returns the JWT(encodedheader.encodedpayload.signature) to the client.

🗂 2. Token Storage
Client stores the token (usually in localStorage, sessionStorage, or an HTTP-only cookie).
🔄 3. Sending JWT
Client includes the token in each request to protected routes:
Authorization: Bearer <token>
🔍 4. JWT Verification (On Each Request)
When the server receives a request with a JWT:
Extract the token from the request header.
Split the token into header, payload, and signature.
Decode the header + payload.
Recalculate the signature using the decoded header + payload and the same secret (or public key if RSA).
Compare the recalculated signature with the one in the token.
If they match, the token is untampered.
Check exp claim to ensure the token hasn’t expired.
If valid → Authenticate the user and proceed.

⚠️ Key Points
JWTs are not encrypted – just encoded.
Never store sensitive info (e.g. passwords) in the payload.
The signature ensures the token is valid and unmodified.
JWTs are stateless – the server does not store session data.
