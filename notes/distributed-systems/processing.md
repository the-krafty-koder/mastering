# Process

A program in execution
Process table - used to keep track of virtual processors.

The operating systems, using hardware ensures processes do not interfere with each other (concurrency transparency). This is not implemented when it comes to threads. The developer is responsible for implementing concurrency transparency

# Thread

A single line of execution within a program

# User space vs Kernel space threads

    # User level
    Managed by the applications running on the computer. They typicall map to one process in a many-to-one relationship. OS doesnt know they exist.

    # Kernel level
    Managed by the OS. Used for parallelism running on multiple cores. Used in one-to-one or many-to-one threading models.

# Thread usage in undistributed systems

    ## Benefits on unthreaded systems

        1. In single threaded process, whenever a blocking call is encountered, the whole process is blocked. Multithreaded process allow you to perform multiple functions that are non-blocking.

        2. It becomes possible to take advantage of parallelism when using computer systems with multicore or multiprocessor technology. Each thread is assigned to a different CPU/Core

        3. Many applications are easier to structure as a collection of cooperating threads.

    ## Thread Implementation
    Can be implemented in 2 ways:
    Kernel space , User space

        ### Advantages of creating threads in user space
        1. It is cheap and easy to create and destroy user threads.
        2. Switching thread context can be done in only a few instructions.
        3.

        ### Disadvantages of user space
        1. Many to one model - blocking call will block the entire process and the corresponding thread

        The disadvantage can be solved by implementing threads in the kernel - where every thread is linked to a scheduled entity.Every thread operation will be carried out by the kernel

        Thread programming is considered to be difficult because the developer manages concurrent access to shared data, not the OS.

# Inter process communication mechanisms

    1. Pipes
    2. Message queues
    3. Shared segments

# Threads in distributed systems

1. Multithreaded clients - useful in browser i.e using multiple threads to fetch data from the server. Display main html while loading scripts and other files using different threads.

2. Multithreaded servers - typically where threading is used the most in distributed systems.

# Virtualization

Extending or replacing an existing interface to mimic the behavior of another system

    # Types of virtualization
    1. Process virtual machine - a runtime system that provides an
       abstract instruction set used for executing applications.
    2. Native virtual machine monitor - provide a system that is
       implemented as a layer shielding the original hardware, but providing the complete instruction set for that same hardware as an interface

Virtual machines - offer a way to run applications relying on a specific environment (OS and instruction set) to run independently across different platforms.

Container - a collection of binaries (images) that jointly constitute the environment for running software.

Clients
Provide a means for users to interact with remote servers.

Progressive Web Apps - applications that run on the browser but appear to be native mobile apps. They do this by moving a lot of the functionality that doesnt require network traffic to the client side, where the functionality is cached

# Server

A process that performs a specific service on behalf of clients.

    Server organization

    Iterative server - server itself handles a request, and if necessary returns a response

    Concurrent server - does not handle the server itself, but passes it to a seperate thread/process

Interrupting a server - server listens to a seperate control endpoint where out of band data ( data to be processed before any other data sent by the client) is sent while at the same time listening to the normal endpoint where data is sent.

    ## Stateless vs stateful servers
    Stateless does not keep track of the state of its clients, and can change state without notifying the servers. Eg a web server. If it crashes, state doesnt need to be reconstructed, unlike stateful servers. The client only needs to resend the request.

    Stateful server maintains persistent information about its clients. The information needs to be explicitly deleted by the server. An example is a file server that allows a client to keep a local copy.

# Server clusters

A collection of machines connected via a network, where each machine runs one or more servers.

It is organized into 3 layers, a logical switch for routing requests,application processing layer and a data processing layer

    Local area clusters - machines which are connected via a LAN

    Wide area clusters - collection of machines scattered all over the internet. An advantage for this is locality - providing users with data thats closest to them.
