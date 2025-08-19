# Chat app like Facebook messenger

Features:
• A one-on-one chat with low delivery latency
• Small group chat (max of 100 people)
• Online presence
• Multiple device support. The same account can be logged in to multiple accounts at the same time.
• Push notifications

# High level design

Basic

    Sender
        <-> Chat service -receive message/relay message
    Receiver

    Detailed
                                        User
                                        |
                                        |
                            http        |     websockets
                        ------------------ ------------------
                        |                                    |
                        |                                    |
                    Load balancer                            |
                        |                                    |
                        |                                    |
                        |                                    |
                        >                                    >
        Notification --------- API Servers <-> Chat & Presence servers
           servers      |                                    |
                        |                                    |
                        ------------> KV store <--------------

• Chat servers facilitate message sending/receiving.
• Presence servers manage online/offline status.
• API servers handle everything including user login, signup, change profile, etc.
• Notification servers send push notifications.
• Finally, the key-value store is used to store chat history. When an offline user comes online, she will see all her previous chat history.

For storage , it is better to use KV store because of the large amount of dat and:

1. Allow easy horizontal scaling
2. They provide low latency to access data.
3. Relational databases do not handle long tail [3] of data well. When the indexes grow large, random access is expensive.

# 1:1 Message flow

    Flow
                    User A                            User B
                    |                                   |
                    |                                   |
    Message ID --  Chat server 1                    Chat server 2
    Generator       |                                   |
                    |                                   |
                    ---------> Message Queue ---------- |
                                        |               |
                                        |               |
                                    KV Store        Presence servers

1. User A sends a chat message to Chat server 1.
2. Chat server 1 obtains a message ID from the ID generator.
3. Chat server 1 sends the message to the message sync queue.
4. The message is stored in a key-value store.
5. a. If User B is online, the message is forwarded to Chat server 2 where User B is
   connected.
6. b. If User B is offline, a push notification is sent from push notification (PN) servers.
7. Chat server 2 forwards the message to User B. There is a persistent WebSocket
   connection between User B and Chat server 2.

# Group Chat message flow

- ## Sender
  User A
  |
  |
  Chat server 1
  |
  |
  ---------------------Message Queue-----Chat server 2-----> User B
  |
  |
  --------------------Message Queue------Chat server 3------> User C

Message Queue acts as an inbox for each recipient.

    -   ## Recipient
        User A              User B
        |                      |
        |                      |
        Chat server 1         Chat server 2
        |                      |
        |                      |
        ------Message queue----
                    |
                Chat server 3
                    |
                    User C
