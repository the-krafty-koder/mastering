# Payment system

Build a backend payments system for an ecommerce site like Amazon.

# Functional requirements

1. Sytems receives money from customers.
2. System sends money to sellers around the world.

# Non functional requirements

1. Reliability and fault tolerance.
2. A reconciliation process between internal and external services.

# High level design

    Payin flow

                Payment event
                        |
            2           |           3
    DB  <------ Payment service  ------> Payment executor -----> PSP (Stripe, Adyen)
                        |                       |                           |
                --------- ----------            DB                          |
            |                    |                                   Settlement file
        Ledger                 Wallet                                       |
            |                    |                                          |
            DB                   DB                                         |
            |                                                               |
             ---------->  Reconciliation -----------------------------------^

    Payout flow

    Similar to payin flow, only instead of using PSP to move out money, a third party payout provider is used

Payment service

- Coordinates payment process.
- Performs risk and compliance checks

Payment executor

- Performs a single payment order via a PSP.

PSP

- Moves money from account A to B.

Ledger

- Keeps a financial record of the payments transaction.

Wallet

- Keeps the account info of the merchant.

1. When a user clicks the pay order button, a payment event is created and sent to payment service.
2. Payment service stores event in DB
3. If a payment event contains several payment orders, the service calls the payment executor for each order.
4. Payment executor stores the payment order in the DB.
5. Payment executor calls external PSP to process the order.
6. After payment executor is finished, payment service updates wallet to record how much each seller has.
7. Wallet server stores updated amount in the database.
8. Payment service then updates ledger information.

# API Design

1. POST v1/payments -> executes a payment event
2. GET v1/payment/{id} -> returns the execution status of a single payment order.

# Data model

We need 2 tables, one for payment event the other for payment orders

- Preferable to use a relation db with acid transaction support.

  Payment event table
  checkout_id string PK
  buyer_info string
  seller_info string
  credit_card_info depends on card provider
  is_payment_done boolean

  Payment order
  payment_order_id string PK
  buyer_account string
  amount string
  currency string
  checkout_id string
  payment_order_status
  ledger_updated boolean
  wallet_updated boolean

# Deep dive

1. PSP Integration

In most cases, companies decide to use hosted payment pages so as not to store sensitive payment info.

    How hosted payment page works
    1. User clicks checkout. Client calls payment service with payment info.
    2. Payment service sends a payment registration request to PSP with payment info.
    3. PSP returns a token back to payments service. Token is a UUID that represents the payment registration.
    4. Payment service stores token in the DB.
    5. Client then displays the PSP hosted payment page.
    6. User fills in the payment details then clicks pay button. The PSP starts payment processing.
    7. PSP returns the payment status and the webpage is redirected to the redirect URL.
    8. Asynchoronously PSP calls the payment service with the payment status.s

2. Reconciliation

   - Network connections can be unreliable and any of the steps above can fail. Reconciliation is used to solve for such cases.
   - Every night the PSP/banks sends a settlement file to clients. The reconciliation system parses that file and compares with the ledger system. The finance performs manual adjustments incase of a mismatch.

3. Handling payment processing delays

   - Sometimes payments stall before being completed.
   - Solved by:
     1. PSP sending a pending status to client for display to the user.
     2. PSP tracks pending payment on clients behalf and notifies the payment service of any update via a webhook / client polls the PSP for updates.

4. Communication amongst internal services

   - Synchronous communication like HTTP works well for small scale services, but has its disadvantages.
     1. Low perfomance - if any component performs poorly, the whole system is affected.
     2. Tight coupling - the request sender needs to know the recipient.
     3. Hard to scale without using a queue as a buffer.
   - Asynchronous communication using queues - could be single subscriber or multiple subscribers. Best option for a large scale payments system.

5. Handling failed payments

   Tracking payment state

   - There is need to have a definitive payment state so that if a failure happens the transaction state can be determined and decide whether a retry or refund is required.

   Retry and Dead Letter Queue

   - To handle failures we incorporate a retry and dead letter queue
   - Retry queue - for transient errors
   - Dead letter queue - for messages that fail repeatedly.

   Exactly once delivery

   - Mathematically, an operation is executed exactly-once if: It is executed at-least-once. At the same time, it is executed at-most-once.
   - Retries with exponential backoff guarantee at-least-once delivery.
   - Idempotency (the property of certain operations whereby they can be applied multiple times without changing the result beyond the initial application)guarantees at most once. A UUID is often used as an idempotency key. It is generated by the client and attached to a request header. The key is most likely a primary key on the DB table eg id of the shopping cart before the checkout.
   - To support idempotency, we can use the database's unique key constraint. For example, the primary key of the database table is served as the idempotency key.

   Here is how it works:

   When the payment system receives a payment, it tries to insert a row into the database table.A successful insertion means we have not seen this payment request before.If the insertion fails because the same primary key already exists, it means we have seen this payment request before. The second request will not be processed.

6. Consistency

- To maintain data consistency, use reconciliation and idempotency.
- To solve replica lag on data replication:
  1. Serve writes from primary db only. Reads from replicas.
  2. Ensure all replicas are always in sync. Use consensus algorithms eg Raft and Paxos.

7. Payment security
   - Request response eavesdropping -> use HTTPS
   - Data tampering -> enforce encryption and integrity monitoring.
   - Man in the middle attack -> use SSL with certificate pinning.
   - Store passwords -> adding salt to hashing.
   - Data loss -> database replication across regions.
   - DDOS -> rate limiting and firewall
   - Card theft -> Tokenization instead of real card numbers
   - Fraud -> adress verification, card verification
