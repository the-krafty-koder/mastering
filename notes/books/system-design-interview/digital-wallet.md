# Digital wallet

- Used to store money to spend later and to transfer money to other users.
- This design specifically supports the cross balance transfer operation between wallets.

# Functional requirements

- Should support balance transfer operations between wallets.
- Should support a large number of transactions per second.
- Should have strict transactional guarantees.

# Non-functional requirements.

1. High availability
2. Correctness - should always reconstruct historical balance by replaying the data from the very beginning.

# High level design

        User A                          User B
           |                               |
           |                               |
           |                               |
     Wallet service                   Wallet service -----------> Zookeeper
           |                               |
           |                               |
     --------------------------------------------------
        DB node         DB node         DB node
     --------------------------------------------------

Wallet service receives transfer command, validates it, then updates account balances for the two users. It is stateless so easy to scale horizontally.

# API Design

Endpoint
POST/v1/wallet/balance_transfer - transfer endpoint.

    Field           Description         Type
    from_account    The debit account   string
    to_account      The credit account  string
    amount          The amount of money string
    currency        The currency        string
    transaction_id  ID used for deduplication uuid”

# Database

- We use Redis nodes to hold account balance data <user, balance> . The nodes need to be distributed though so we use hash partitioning to distribute the data.

  node = hash(accountID) % no_of_partitions

- We then use Zookeeper to store number of nodes and their addresses.
- In order to enforce transactions, and distributed commit since 1 part of the transfer eg debit can fail and the other succeeds, we use SQL DB and 2 phase commit

# Event sourcing

- Used to provide a clear audit of historical and current account balances/ transactions.
- 4 important terms

1. Command

- Intended action from the outside world. Eg transfer $1 from A to B.
- Commands are usually put into a FIFO queue in order to maintain order.
- A command must be validated before an action is applied.

2. Event

- The result of fulfilling a command once it has been validated.
- Events must always be deterministic i.e predictable, no randomness.
- A command may generate multiple events, and events must follow the order of command, so they are stored in a FIFO queue as well.

3. State

- This is what will be changed when an event is applied.
- A state machine drives event sourcing. It has 2 major processes
  1. validate commands and generate events.
  2. apply event to update state.
- Event sourcing requires the state machine to be deterministic, so it should never read anything from random using I/O or use random numbers.

  How the state machine works

  - For the wallet service, the Commands are balance transfer requests. These Commands are put into a FIFO queue. The state machine:

  1. Read Command from the Command queue.
  2. Read balance State from the database.
  3. Validate the Command.
  4. If it is valid, generate two events for each of the accounts.
  5. Read the next Event from event queue.
  6. Apply the Event by updating the balance in the database.

4. Reproducibility.

- Used to audit how balances came to be by replaying all events from start to current.

# Command Query Responsibility Segregation.

- There needs to be a way to publish the balance (state) to the outside world. Event sourcing achieves this by publishing all events. The outside world can then rebuild any customized itself. This is called CQRS.
- In CQRS, there is one state machine for the write part of the state, but there can be many read only state machines, responsible for building views of the state.
