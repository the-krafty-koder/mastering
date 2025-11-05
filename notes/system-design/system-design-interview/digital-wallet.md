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

- Initially we use Redis nodes to hold account balance data <user, balance> . The nodes need to be distributed though so we use hash partitioning to distribute the data.

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
- In CQRS, you segregate read and write operations for a data store into seperate data models. This allows each model to be optimised independently and can improve performance.

  Why its needed

  - As app grows, it becomes difficult to optimise read and write operations on a single data model as they have differing performance and scalability requirements.
  - A traditional CRUD architecture (eg a single User model that does both read and writes) can result in the following challenges.
    1. Data mismatch -> read and write operations of data often differ. Some fields required during updates are unneccessary in update operations.
    2. Lock contention -> parallel operations on the same data set can cause lock contention.
    3. Traditional approach can lead to performance problems because of load on the data store and data access layer.
    4. Security challenges -> It can be difficult to manage security when entities are subject to read and write operations. This overlap can expose data in unintended contexts.

  Solution

  - Use CQRS to seperate writes (commands) from reads (queries)
  - A write model is for updating or persisting data, it includes validation and domain logic, and helps optimise for consistency by ensuring transactional integrity.
  - A read model is for retrieving data and generates DTOs.
  - CQRS can be implemented in 2 ways, using either a single data store or a shared data store. Seperate data stores allow you to scale each model to match the load and also different technologies for each store.

  Advantages

  1. Independent scaling -> allows read and write models to be scaled independently.
  2. Optimised schemas -> read and write schemas are optimised for their operations.
  3. Security -> by seperating reads and writes you ensure only appropriate entities have permission to perform write actions on data.
  4. Seperation of concerns -> seperating both ensures better maintainability.
  5. Simpler queries

  Disadvantages

  1. Increased complexity in application design.
  2. Messaging challenges.
  3. Eventual consistency when seperate data stores are used.

  When to use

  1. When multiple users access and modify the same data simultaneously.
  2. You need performance tuning, especially when number of reads is greater than number of writes.
  3. You need seperation of development concerns as it allows teams to work independently.One team implements the complex business logic in the write model, and another team develops the read model and user interface components.
  4. You need system integration -> systems that integrate with other subsystems especially systems that use the event sourcing pattern, remain available even if a subsystem temporarily fails.
  5. You have evolving patterns eg new model versions, changing business rules.

  When not to use

  - When business or domain rules are simple.
  - A simple CRUD style interface and data access operations are simple.

  Event sourcing + CQRS

  - In event sourcing state is stored as a series of events (each capturing data) that can be replayed. In this setup

    1. Event store is the write model and single source of truth.
    2. Read model generates materialised views from these events.

    Advantages

    1. The same events updating write model can serve as inputs to the read model.Read model can the build a real time snapshot of current state. Using a stream of events as the writes store reduces update conflicts on aggregates and enhances performance

    Considerations

    1. Eventual consistency -> updates to read data store might lag behind event generation. This delay results in eventual consistency.
    2. Generating materialised views can consume significant time and resources.
    3. Increased complexity.

  Example

  We have an online store.
  We need to:
  Create orders (write operations)
  Display order summaries (read operations)

  ```
  // orderModel.js
  export const Order = {
    id: Number,
    userId: Number,
    items: [
      { productId: Number, quantity: Number, price: Number }
    ],
    total: Number,
    createdAt: Date,
    status: String
  }
  ```

  With CQRS

  ```
  // write/orderCommandHandler.js
  import { db } from './db.js'

  export async function createOrder(command) {
    const { userId, items } = command
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    // Business rules: e.g. can't order zero items
    if (items.length === 0) throw new Error('Order must have at least one item')

    await db.insert('orders', {
      user_id: userId,
      items: JSON.stringify(items),
      total,
      status: 'PENDING',
      created_at: new Date()
    })
  }
  ```

  ```
  // read/orderQueryHandler.js
  import { db } from './db.js'

  export async function getOrderSummaries(userId) {
    return db.query(`
      SELECT
        o.id,
        o.total,
        o.status,
        u.name as customer_name,
        COUNT(oi.id) as item_count
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.user_id = ?
      GROUP BY o.id, u.name, o.status
      ORDER BY o.created_at DESC
    `, [userId])
  }
  ```
