Security policy - describes which actions entities in a system can take and which ones are prohibited.

Security mechanisms - how a security policy can be enforced. The following are the most important

1. Encryption - transforming data into something an attacker cannot understand.
2. Authorization - verifying the claimed identity of a user
3. Authentication - checking if the user has the permissions to perform a requested action.
4. Monitoring and auditing - used to trace access to assets and recording what has happened.

# Design issues

There are a number of important design issues that need to be considered
when implementing general-purpose security services.

1. Fail safe defaults
   Assuming that any set of defaults will not be changed. This principle states that defaults should therefore already guarantee a good degree of protection.
2. Open design
   Everyone should be able to see which mechanisms are being used, how they
   are being used, how they have been implemented in a distributed system.
3. Separation of privilege
   Ensuring that truly critical aspects of a system can never be fully controlled by just a single entity.
4. Least priviledge
   A process should operate with the fewest possible priviledges.
5. Least common mechanism
   If multiple components require the same use of a mechanism, then they should be given the same implementation of the same mechanism.

# Cryptography

When transferring a message as ciphertext, there are 3 main attacks we need to protect against:

1. An intruder may intercept the message without either sender or receiver being aware that it is happening.
2. Modifying the message
3. When an intuder introduces encrypted messages into the communication channel.

# Symmetric and asymmetric cryptosystems

In symmetric (secret-key / shared key), the key used to encrypt and decrypt is the same.
In asymmetric (public-key), keys are different (seperate key for encryption and decryption) but both are used to form a unique pair.

Homomorphic encryption - mathematical operations on plaintext
can also be performed on the corresponding ciphertext. A server can apply
operations on encrypted data and the result (also automatically encrypted
with the same key) can be safely stored as well, or used in other computations. Problem is its perfomance is slow.

# Hash function

A hash function H takes a message m of arbitrary length as
input and produces a bit string h having a fixed length as output:

## Digital signatures

Uses hash functions to send messages.

Scenario:
Alice agrees to buy a vinyl record from Bob for $500 via email. She wants to confirm the deal securely so that:

Bob can’t alter the message (e.g., change $500 to $800),

Alice can’t deny she sent the message later (non-repudiation),

And no one else can read the message (confidentiality).

🔐 Steps Alice takes:

1. Create the message:
   m = "I will buy the record for $500"
2. Hash the message (create a digest):
   h = H(m)
3. Sign the digest with her private key:
   sig = SKA(h)
4. Encrypt the message and signature with Bob’s public key:
   C = PKB([m, sig])
5. Send C to Bob

✅ Steps Bob takes to verify:

1. Decrypt the message with his private key:
   [m, sig] = SKB(C)
2. Hash the received message:
   h' = H(m)
3. Verify the signature using Alice’s public key:
   h = PKA(sig)
4. Compare the digests:
   If h == h', the message is: Untampered, Alice signed.

# Key establishment

Diffie-Hellman Key Exchange – Summary Notes:
Purpose: Securely establish a shared secret key over an insecure channel.
Public Parameters: Two large numbers, p and g, agreed upon by both parties (publicly known).

Private Keys:
Alice chooses a private number x.
Bob chooses a private number y.
Exchange Process:
Alice sends g^x mod p to Bob.
Bob sends g^y mod p to Alice.
Shared Key Computation:
Bob computes (g^x mod p)^y = g^(xy) mod p.
Alice computes (g^y mod p)^x = g^(xy) mod p.

Outcome: Both compute the same shared secret key g^(xy) mod p, without revealing their private numbers.

N/B
Diffie-Hellman can also be viewed as a public-key cryptosystem. In the
case of Alice, x is her private key, whereas gx mod p is her public key.

# Key distribution

Public-key distribution takes place by public-key certificates. Such a certificate consists of a public key together with a string identifying the entity to which that key is associated.

# Authentication

Verifying the claimed identity of a person

- 4 means:

1. Authentication based on what a client knows eg password
2. "" has eg ID, cell phone
3. " " is eg biometrics
4. " " does eg dynamic biometrics eg voice patterns or typing patterns

Single factor authentication - only one of the 4 means of communication is used.

# Authentication Protocols

Authentication and message integrity cannot do without each other

## Authentication based on a shared secret key

Goal: Mutual authentication between Alice and Bob using a shared secret key KA,B.

Steps:

Alice → Bob: Sends her identity to initiate communication.
Bob → Alice: Sends a random challenge RB.
Alice → Bob: Encrypts RB with shared key (KA,B(RB)) and sends it back.
Bob decrypts and verifies RB → confirms Alice's identity.
Alice → Bob: Sends her own challenge RA.
Bob → Alice: Sends KA,B(RA) (encrypted challenge).
Alice decrypts and verifies RA → confirms Bob's identity.
Result: Both parties confirm each other’s identities using their shared key.

    Disadvantage
    It is not scalable if you have multiple nodes that need to communicate with each other in a distributed system.

## Authentication using a key distribution center

Purpose: Establish a secure channel between Alice and Bob via a trusted third party (KDC).

Process:
Alice → KDC: Requests to communicate with Bob.
KDC → Alice: Sends a new shared key KA,B, encrypted with KA,KDC (key shared between Alice and KDC).
KDC → Bob: Sends the same KA,B, encrypted with KB,KDC (key shared between Bob and KDC).

Result: Both Alice and Bob receive the same session key KA,B securely, allowing them to communicate confidentially.

    Disadvantage
    1. Alice may want to start setting
    up a secure channel with Bob even before Bob had received the shared key
    from the KDC.
    2. The KDC is required to get Bob into the loop by passing him the key.

## Authentication using a public-private key

Goal: Alice and Bob verify each other’s identities using public-key cryptography and establish a session key.

Steps:
Alice → Bob: Sends challenge RA encrypted with Bob’s public key PKB.
Bob decrypts it with his private key → proves his identity to Alice.
Bob → Alice: Sends back RA, a new challenge RB, and a session key KA,B, all encrypted with Alice’s public key PKA.
Only Alice can decrypt it → ensures message is intended for her.
Alice → Bob: Sends back RB, encrypted using the session key KA,B.

Proves she successfully decrypted Bob’s message → confirms her identity.
Result: Both parties are authenticated and share a session key KA,B for secure communication.

# Session Keys

After the authentication process has completed, parties usually use a unique shared key for confidentiality.

    Benefits of using a session key
    1. When a key is often used, it is much easier to reveal, hence why authentication keys should not be used often.
    2. By using a unique session key each time a secure channel is set up, the communicating parties are at least protected against replaying an entire session.

# Authorization

## Access control policies

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
