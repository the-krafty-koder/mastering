# Types of communication

1. Remote procedure calls
   Allowing programs to call procedures located in remote machines

   The process:

   1. The client procedure calls the client stub in the normal way.
   2. The client stub builds a message and calls the local operating system.
   3. The client’s OS sends the message to the remote OS.
   4. The remote OS gives the message to the server stub.
   5. The server stub unpacks the parameter(s) and calls the server.
   6. The server does the work and returns the result to the stub.
   7. The server stub packs the result in a message and calls its local OS.
   8. The server’s OS sends the message to the client’s OS.
   9. The client’s OS gives the message to the client stub.
   10. The stub unpacks the result and returns it to the client.

   The function of the client stub is to take parameters, parse them into a message and pass it to a server stub. The process of packing parameters is called parameter marshalling.

   Variations of RPC

   1. Asynchronous RPC
      Used to support situations in which there is no result to return to the client.
      The server immediately sends a response to the client the moment the RPC request is received.The server then locally calls the requested procedure

   2. Multicast RPC
      Sending an RPC request to a group of servers, who subsequently process the requests in parallel. When done the result is returned to the client where the callback takes place.

2. Message Queues

- Read MQ notes

# Protocol buffers (Protobuf)

A serialization format for storing data to send across a network.It is strongly typed.You start by defining a schema in a .proto file. The file is then compiled to data classes in a given language.

Advantages

1. Smaller payload because encoding is more efficient.
2. Fast serialization/deserialization
3. Type safety
4. Wide language support

JSON Advantages

1. Human readable
2. Widely supported
3. Flexible schema - format of your data doesnt have to be defined in advance.
4. Huge amount of tooling available.

JSON Disadvantages

1. Results in large payload sizes.
2.
