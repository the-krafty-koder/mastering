# Strategy pattern

It enables an object (context) to support variations in its logic by extracting the variable parts into seperate objects called strategies.

# State pattern

A specialization of the strategy pattern where the strategy changes based on the state of the context.

# Template patterns

It implements an abstract class that defines common methods (skeleton) and
then leaves 'template methods' which are then extended by children classes

# Iterator

It defines a common interface for iterating the elements of a container.
Usually, the algorithm
for iterating over the elements of a container is different depending on the actual structure of the data.
The iterable protocol defines a standardized means for an object to return an iterator. Such objects are called iterables. Usually, an iterable is a container of elements, such as a data structure, but it can also be an object virtually representing a set of elements, such as a Directory object, which would allow us to iterate over the files in a directory.
In JavaScript, we can define an iterable by making sure it implements the @@iterator method, or in other words, a method accessible through the built-in symbol Symbol.iterator.

`class MyIterable {
// other methods... [Symbol.iterator] () {
    // return an iterator
} }`

# Middleware

Original meaning - functionality that abstract low level OS mechanisms eg network communication, memory management, OS APIs etc.

Express meaning - a set of services (normally functions) organised into a pipeline that process requests and responses.

Pattern meaning - a set of handlers, under the form of functions, are connected to form an asynchronous sequence in order to perform the preprocessing and postprocessing of any kind of data

## Functions carried out by express middleware.

    1.Parsing request body -Validation
    2.Logging
    3.Session management
    4.Authentication
    5.Managing cookies
    6.CSRF Protection
    7.Error management

# Command

Any object that encapsulates all information necessary to perform an action
at a later time. Instead of invoking a method or a function directly, we create an object representing the intention to perform such an invocation. It will then be the responsibility of another component to materialize the intent, transforming it into an actual action.

    ## Applications

    1. Command can be scheduled for execution at a later time
    2. A command can be easily serialized and sent over the network.
    3. Commands make it easy to keep a history of all operations executed.
    4. Commands are an important part of some algorithms for data
        synchronization and resolution
    5. A command scheduled for execution can be cancelled if not executed.
    6. Several commands can be grouped together to create atomic
        transcations.
