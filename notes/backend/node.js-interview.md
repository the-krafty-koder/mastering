🧠 Core Concepts

# Event loop (phases, call stack, callback queue, microtasks)

- Mechanism by which JS handles asynchronous operations without blocking the main thread.

  Comprises:

        1. Call stack - tracks function execution
        2. Callback Queue /  Task queue - stores functions to execute after the current stack clears.
        3. Microtask queue - high priority tasks.

How it works

1. All synchronous operations are executed on the call stack.
2. When an async operation is encountered, it is sent to the browsers web APIS, or Nodes C++ APIs.
3. When the aysnc operation is completed, it sends the callback to a queue.
4. Queue could be macrotask queue (callback queue) for things like setTimeout, setInterval, I/O or micro-task queue for things like Promise.then, MutationObserver.
5. The event loop constantly checks if the call stack is empty, if so processes all microtasks eg Promises then pops 1 macrotask from task queue and pushes on call stack for execution then REPEAT.

# Event loop phases

1. Timer

- Processes timers that have been set using setTimeout() and setInterval()

2. Pending callback

- Executes I/O related callbacks that were deferred from the previous loop cycle eg setImmediate

3. Idle, prepare

- Used internally by Node.js for background tasks.

4. Poll phase

- Executes most of the tasks like I/O , file reading

5. Check phase

- Processes any setImmediate callbacks that have been added to the message queue.

6. Close callbacks phase

- Executes callbacks for closed connections like sockets, streams and event emmitters.

# Asynchronous programming (callbacks, promises, async/await)

Single-threaded nature of Node.js

- JS has 1 main thread that executes code line by line in a call stack.

Blocking vs non-blocking I/O

- I/O includes operations like

1. Writing and reading from files.
2. Network requests
3. Database queries
4. Printing to consoles.

- In blocking I/O, the program waits until the I/O operation is finished before moving on.
- In non-blocking, the program starts the I/O operation but doesnt wait . It registers a callback, promise or event to handle the result later.

# Streams (Readable, Writable, Duplex, Transform)

1. Readable - data flows into your program.
2. Writable - data flows from your program.
3. Duplex streams - can both be readable and writable eg network sockets.
4. Transform streams - duplex streams that can modify or transform the data.
   Buffer and binary data handling

📁 Modules & Architecture

# CommonJS vs ES6 Modules

    CommonJS - modules imported using `require`
               modules exported using `module.export`
               modules loaded synchronously at runtime
    ES6 Modules - uses `import` and `export`
                  modules are loaded asynchronously.

# Built-in modules (fs, path, http, events, etc.)

# Dependency management (npm/yarn)

Module caching and require mechanics

# Practical APIs

1. fs (read/write files, sync vs async methods)

- fs.readFile & fs.readFileSync -> readsFile

```
    fs.readFile('myfile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
    });
```

http & https (creating servers/clients)

url and querystring modules

events and EventEmitter

Child processes (child_process.fork, spawn, exec)

🧪 Testing & Debugging
Unit testing with Jest, Mocha, or Tap

Mocking dependencies

Debugging with Node Inspector, console, VSCode debugger

Writing and using testable code

🔒 Security
Preventing common vulnerabilities (XSS, CSRF, SSRF, SQL injection)

# Rate limiting

- See rate limiting notes

# JWT and session authentication

- See JWT notes

# Secure headers (Helmet)

Environment variables and secrets management

🧩 Package Management
package.json fields (dependencies, scripts, engines)

Semantic versioning

- A way of numbering software releases.
  4.7.6
  4 - major version
  7 - minor version
  6 - patches

Local vs global packages

- Local packages are those installed using `npm install <package_name>`. They are only accessible in the project in which they are installed.
- Global packages are installed on a single location in the file system. They can be installed using the `-g` flag
  Creating a custom package

📦 Frameworks
Express.js (routing, middleware, error handling)

NestJS (if you're going full-stack/typesafe)

Koa, Fastify (alternatives to Express)

🛠 Tooling
Nodemon, PM2

ESLint, Prettier

ts-node (TypeScript in Node.js)

⚙️ Deployment & Operations
Running in production (clustering, process managers)

Dockerizing a Node.js app

Using environment variables (dotenv)

Monitoring/logging (Winston, Morgan)

🗄️ Databases
Connecting to SQL/NoSQL databases (PostgreSQL, MongoDB, Redis)

ORMs like Sequelize, Prisma, Mongoose

Query optimization and error handling

# Avoiding callback hell

1. Use named functions
2. Use promises
3. Use async/await

# child_process.fork vs child_process.spawn

- spawn launches a new process with a specific command.
- fork is a special case of spawn design for node modules. It establishes a communication channel between parent and child process allowing them to exchange messages.

# Node.js worker threads vs Node.js child_process

- Worker threads were built specifically for CPU intensive tasks in Node that would otherwise block the main single thread. Unlike child_processes, they use shared memory making it easier to exchange data. They should only be used for computation though, not I/O.

# The reactor pattern

- Handles I/O by blocking until new events are available from a set of observed resources, and then reacts by dispatching each event to an associated handler.

# Compiling typescript

1. Typescript source code is compiled to an AST.
2. AST is checked by the typechecker
3. Typescript AST is compiled to javascript code.
4. Javascript source code is compiled to an AST.
5. JS AST is compiled to bytecode.
6. Bytecode is evaluated by runtime.

# Type conversion

1. Type coercion (implicit type conversion) -> eg num + str (num is converted to string in JS)
2. Type casting (explicit type conversion) -> Number(str)

# Enums

- Giving meaningful names to a set of related constants.

`enum OrderStatus {
  DELIVERED = 'DELIVERED',
  PENDING = 'PENDING'
}`

# Types

undefined - variable that has been declared but not assigned a value
null - no value or empty value
any - used to turn off type checking
unknown - safer alternative to any. Value could be anything, but ill check before using. Useful when you don’t know what a value will be, but want to enforce checking before use.
void - used for functions that dont return a value.
