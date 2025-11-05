# Fundamentals

1. Everything is a resource
   Data is represented by a specific format and not a file containing bytes. Each piece of data is a resource represented by content-types eg MPEG, HTML, XML etc

2. Each resource is represented by a unique identifier.
   All resources should be accessible via URIs and be identified uniquely. URIs need to be in human readable format. Example “http://www.mycatalog.com/categories/watches/model-xyz/video”

3. Manipulating resources via standard http methods

   GET -> retrieves a resource
   200 OK if it exists
   404 Not Found if it doesn't exist
   500 Internal Server Error for other errors.

   PUT -> updates a resource
   200 OK if successfully updated
   201 Created if a new resource is created.
   404 Not Found if it doesn't exist
   500 Internal Server Error for other errors.

   POST -> creates a resource with identifier generated at server or updates a resource with an existing identifier.
   201 Created if a new resource is created.
   200 OK if a resource has been updated successfully.
   409 Conflict if the resource already exists and update is not allowed.
   404 Not Found if it doesn't exist
   500 Internal Server Error for other errors.

   DELETE -> deletes a resource
   200 OK or 204 No Content if the resource has been deleted.
   404 Not Found if it doesn't exist
   500 Internal Server Error for other errors.

   # Http Error Codes

   1xx: Informational
   100 Continue: Request received, continue to send the rest.
   101 Switching Protocols: Server agrees to switch protocols.

   2xx: Success
   200 OK: The request was successful.
   201 Created: A new resource has been created.
   204 No Content: The request was successful, but no content to return.

   3xx: Redirection
   301 Moved Permanently: The resource has a new permanent URI.
   302 Found: Temporarily located at a different URI.
   304 Not Modified: The cached version is still valid.

   4xx: Client Errors
   400 Bad Request: The server couldn’t understand the request.
   401 Unauthorized: Authentication is required.
   403 Forbidden: Access is not allowed.
   404 Not Found: The requested resource could not be found.
   405 Method Not Allowed: The HTTP method is not supported.
   429 Too Many Requests: The user has sent too many requests in a given amount of time.

   5xx: Server Errors
   500 Internal Server Error: The server encountered an unexpected condition.
   502 Bad Gateway: Received an invalid response from an upstream server.
   503 Service Unavailable: The server is temporarily unavailable.
   504 Gateway Timeout: The server didn’t receive a timely response from another server.

4. Resources can have multiple representations
   As long as a specified format is supported, a rest endpoint should use it. Example: XML representation vs JSON representation.

5. Communicate with resources in a stateless manner
   All modifications of a resource should be carried out within an HTTP request in an isolated manner. You should always send the complete state of a resource.

   Keep a part of the state within the URI, or use HTTP headers to provide additional state-related data.

# Rest Goals

1. Seperation of the representation and the resource.
   State of a resource is atomic, it is up to the caller to define the desired media type they want via an Accept header. It is then up to the server to handle the representation accordingly, return the appropriate content-type alongside a HTTP status code.

   HTTP 200 OK in the case of success
   HTTP 400 Bad Request if an unsupported format is given or for any other invalid request information
   HTTP 406 Not Acceptable if an unsupported media type is requested
   HTTP 500 Internal Server Error when something unexpected happens during the request processing

2. Visibility
   Every accept should be self-descriptive and follow the natural HTTP language of principles 3,4,5

3. Reliability
   Safe HTTP method - it does not modify or cause any side effects on the state of the resource. Only GET is safe of the 4
   Idempotent HTTP method - if its response stays the same, regardless of the number of times it is requested. Only POST is not idempotent of the 4 main methods

4. Scaling and perfomance
   Scaling applications that have a state is difficult.

# Best practices for RESTFUL API Design

1. Proper naming of resource paths.
2. Represent actions as CRUD operations
3. Return meaningful status codes.
4. Use caching and pagination to improve perfomance.
5. Use proper versioning mechanisms

# How to handle API Versioning

1. Use version identifiers in APIs or URLs
2. Give each version a long lifespan to identify weaknesses in its design.
3. Provide thorough documentation
4. Optional url parameters
