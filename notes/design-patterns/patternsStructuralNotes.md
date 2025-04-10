# Structural patterns Notes

They include: - Proxy - Adapter - Decorator

## Proxy

An object used to manage access to an instance of another object(subject). It normally has the same interface as the object. Also called a surrogate

### Applications

- Data validation
- Security: perform authorization checks
- Caching: cache and check results before an operation is perfomed
- Lazy initialization: if object initialization is expensive, it can delay it
- Logging: recording events as they happen
- Remote objects: make remote objects appear local

### Techniques

When implementing proxies, we can decide to implement all methods or only some of the object

    - Object composition - when an object is combined with another object for the purpose of extending or using its functionality. In the specific case of the Proxy pattern, a new object with the same interface as the subject is created, and a reference to the subject is stored internally in the proxy in the form of an instance variable or a closure variable. The subject can be injected from the client at creation time or created by the proxy itself.

    - Object augmentation (monkey patching) -  It involves modifying the subject directly by replacing a method with its proxied implementation. This technique is definitely convenient when we need to proxy only one or a few methods.

N/B
Transpilation -> short for transcompilation. Compiling source code by translating it from one programming language to another. Used in javascript by converting es6 to es5

Polyfill - code that provides an implementation for a standard API in plain js and that can be imported in environments where this API isn't available.

## Decorator

A way of dynamically augmenting (adding to) the functionalities of an existing object

### Techniques

    - Composition
        Wrapping the decorated component in a new object that inherits the decorated components methods
    - Augementation
        Adding/modifying functionality to an instance of the decorated component

## Difference between proxy and decorator

    Proxy is used to control access to an object, normally has the same interfaces as the object itself. Decorator is used to add functionality to an existing object, normally has more methods than the object itself

## Adapter

    Allows one to access the functionality of an object using a different interface
