Design Gmail, Outlook, Yahoo

# Functional requirements

1. Send and receive emails
2. Fetch all emails
3. Filter emails by read and unread status
4. Search emails by subject, sender and body
5. Anti-spam and anti-virus

# Non functional requirements

1. Reliability - dont lose email data
2. Availability - emails should be accessible any time.
3. Scalability - handle millions of users.
4. Flexibility - should handle new components.

# Tip : Email knowledge

Various email protocols, SMTP, IMAP, POP
SMTP - standard protocol for sending emails from one server to another.
POP & IMAP - used to retrieve emails from servers.

POP - used to receive & download emails from servers. Once received, it is deleted from the mail server.POP requires mail clients to download the entire email.
IMAP - also used to receive emails from servers. When you read an email, you are connected to an external mail server, and data is transferred to your local device. IMAP only downloads a message when you click it, and emails are not deleted from mail servers, meaning that you can access emails from multiple devices. IMAP is the most widely used protocol for individual email accounts. It works well when the connection is slow because only the email header information is downloaded until opened.

DNS - used to lookup the mail exchanger record for the recipient's domain before sending an email.

# Traditional mail server architecture

            User
             |
           Client
             |
             |
     --------------------     Send
    | IMAP          SMTP |  <------>         SMTP (Other server)
    |   |             |  |
    |   |             |  |
    |    -- Storage --   |
     (outlook mail server)
     --------------------

    The process consists of 4 steps:

1. Alice logs in to her Outlook client, composes an email, and presses the "send" button.
2. The email is sent to the Outlook mail server. The communication protocol between
   the Outlook client and the mail server is SMTP
3. Outlook mail server queries the DNS (not shown in the diagram) to find the address o
   the recipient's SMTP server. In this case, it is Gmail's SMTP server. Next, it transfers the email to the Gmail mail server. The communication protocol between the mail servers is SMTP.
4. The Gmail server stores the email and makes it available to Bob, the recipient.
   Gmail client fetches new emails through the IMAP/POP server when Bob logs in to
   Gmail.

# Email APIs

POST v1/messages -> send message to recipients
GET v1/folders -> return all folders of an email account
GET /v1/folders/{:folder_id}/messages - return all messages under a folder.
GET /v1/messages/{:message_id} - gets all info about a specific message.

# Distributed Mail Server architecture

                            Web mail
                                |
                                |
          ------------------------------------------
         |                                          |
    Web server                                    Real time servers
         |                                          |
         |                                          |
         |                                          |

          Metadata  Attachment  Distributed   Search
          DB          store          Cache     store

Webmail - uses web browsers to send and receive email
Web server - manages features such as login,auth, user profile. all email api requests eg sending email, loading all emails go through web servers.
Real time servers - push new email updates to clients in real time.
Metadata DB - stores mail metadata including subject, body from users to users.
Attachment store - stores mail attachments eg S3
Distributed cache - for storing recently used emails
Search store - supports very fast full text searches since it is a distributed document store.

# Email Sending flow

    Web mail
        |                               Check spam
    Load balancer                           |
        |                               Check virus
        |                                   |
        |       Error queue               Retry
        |           |                       |
    Web server -----> Outgoing ----------> SMTP Outgoing -----> Internet
        |              Queue                    |
        |                                       |
        |                                       |
        |                                       <
        >----- Metadata  Search store  Attachment   Cache
                DB          DB

User sends email → Request hits load balancer, which checks rate limits.

- Web servers handle:
  - Basic email validation (size, domain check).
  - If sender and recipient share the domain and email is clean, it’s delivered directly via API (skipping queue).
- Message queues:
  - Valid emails → outgoing queue (large attachments go to object store).
  - Invalid emails → error queue.
- SMTP workers pull from the outgoing queue, re-check for spam/viruses.
- Clean emails → stored in Sent Folder and sent via SMTP to recipient server.

# Email receiving flow

    Messsage
        |                                                        --- Webmail ---
        |                                                       |               |
    Load balancer                                               |               |
        |                                                       >               <
         ------> SMTP Server ---> Incoming mail --> Mail ---> Real time       Web
                       |             queue        processing   servers       servers
                       |                                                        |
                       >                                                        |
                     Metadata  Search store  Attachment   Cache <----------------
                        DB          DB

- Emails arrive at the SMTP load balancer, which routes them to SMTP servers.
- Invalid emails are bounced early to save resources.
- Large attachments are stored in S3, with a reference used in the message queue.
- Emails go into the incoming queue, decoupling processing from SMTP and handling traffic spikes.
- Mail processing workers validate, filter spam, and block viruses.
- Valid emails are saved in mail storage, cache, and object store.
- If the recipient is online, the email is pushed via WebSocket real-time servers.
- If offline, the email stays in storage until fetched through RESTful API when the user reconnects.

# Deep Dive

1. Metadata DB

Xtics of email metadata

1. Headers are usually small and frequently accessed.
2. Body sizes vary and are infrequently accessed.
3. Mails owned by a user are only accessible by that user.
4. Data has high availability requirements. Data loss is unacceptable.

- For email, a customized db is usually used with the following xtics (Gmail uses Bigtable (NoSQL))

1. Strong data consistency
2. Designed to reduce disk I/O
3. Should be highly available and fault tolerant.
4. Should be easy to create incremental backups.

# Data model

- Partition emails by user_id so they are stored on the same mail server.

Data model for emails in a specific folder

user_id UUID
folder_id UUID
emal_id TIMEUUID CL
from TEXT
subject TEXT
preview TEXT
is_read BOOLEAN
attachments LIST filename/sizes

# Email deliverability

- Have dedicated IPs to send emails
- Classify emails -> send different categories of emails from different IPs.
- Warm up new email server IPS to build reputation.
- Ban spammers quickly before they ban reputation.

# Email search

- Should allow search by email attributes eg sender, time etc.
- Search feature in email systems has a lot more writes than reads because whenever an email is sent, received, or deleted, we need to perform reindexing.
- To support search, we have two processes ( elastic search and embedded native search)

1.  Elastic search

        Search      Send email      Receive email   Delete email
        |            |                 |               |
        |            |                 |               |
        |            |                 >               |
        |             -------------> Kafka <-----------
        |                              |
        |                              |
        |                              |
        |                              >
         ----------------------->  Restful APIs
                                       |
                                       |
                                Elastic Search Cluster

2.  Custom search - involves designing your own custom search solution

# Scalability and Availability

- Most components should be horizontally scalable
- Data should be replicated across multiple data centers for better availability. Users communicate with servers physically closer to them.
