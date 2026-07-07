# HTTP

- Fundamental protocol that enables data transfer between client and server.

  Features

  1. Stateless - each request is independent and server doesnt retain previous info.
  2. Text based - messages are sent in plain text.
  3. Client-server model - follows a client-server architecture for requesting and serving resources.
  4. Request methods - supports various methods like GET, POST, PUT etc.

  Advantages

  1. Can work on any OS.
  2. Compatible with various protocols and tech
  3. Efficiency - optimised for performance.
  4. Security - supports encryption.

  Disadvantages

  - Prone to man in the middle attacks.
  - Can be slow for large data transfers.
  - Statelessness - requires additional mechanisms for handling state.

# Why HTTP was made stateless

1. Simplicity - protocol is simple and easy to implement as the server doesnt need to remember anything from before.
2. Scalability - no need to manage state which could consume memory and resources per client.
3. Reliability - if a server crashes, no state is lost.
4. State can still be added via cookies, sessions, url parameters, jwt tokens.

# Persistent HTTP connnections

- On by default, unlike in the past. Early on every request opened a new TCP connection, but now it stays persistent for multiple requests between client and server.
- You can control persistence with heADERS:

```
Connection: keep-alive
```

to close:

```
Connection: close
```

    Advantages of persistent connections
    1. Faster performance as reusing TCP connections avoids 3 way handshake every time.
    2. Lower CPU and network load.
    3. Better resource usage.

    Disadvantages
    1. Resource locking as each open connections keeps memory allocated. If thousands of clients remain connected but idle it could lead to resource exhaustion.
    2. Idle timeouts - long lived connections can hang around, consuming slots for new clients.
    3. Complexity with connection management.

# Content-Type

- Used to describe payload content

```
| Type       | Example MIME type                       | Used for                |
| ---------- | --------------------------------------- | ----------------------- |
| Text       | `text/plain`                            | Plain text              |
| HTML       | `text/html`                             | Web pages               |
| JSON       | `application/json`                      | API data                |
| JavaScript | `application/javascript`                | Scripts                 |
| Form data  | `application/x-www-form-urlencoded`     | Normal form submissions |
| Multipart  | `multipart/form-data`                   | File uploads            |
| XML        | `application/xml`                       | XML documents           |
| Image      | `image/png`, `image/jpeg`, `image/webp` | Images                  |
| Audio      | `audio/mpeg`, `audio/ogg`               | Music/sound             |
| Video      | `video/mp4`, `video/webm`               | Video files             |
| PDF        | `application/pdf`                       | Documents               |
| Binary     | `application/octet-stream`              | Generic                 |

```

- While Content-Type says what you’re sending, Accept says what you want to receive.

# AJAX

- Stands for asynchronous javascript and xml. It is a technique that javascript uses to send and receive data from a server in the background, without reloading the whole page.

  Implementing AJAX

  1. Use XMLHTTPRequest

  ```
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users');
    xhr.onload = function() {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    }
    };
    xhr.send();
  ```

  2. Using fetch

  ```
  fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
  ```

  AJAX uses

  1. Submitting forms without page refresh.
  2. Loading content dynamically eg infinite scroll.
  3. Autocomplete search boxes
  4. Periodically polling the server for updates.
  5. Building SPAs

# TCP Handshake

It is used to establish a reliable connection between client and server before data transfer.

    Process
    1. SYN -> Cient wants to establish a connection with the server, so it sends a segment with SYN(Synchronize Sequence Number) which says the client is likely to start communication and with what sequence number it starts segments with.

    2. SYN + ACK -> Server responds with SYN+ACK signifying it received the segment and with what sequence number it is likely to start the segments with.

    3. ACK -> client acknowledges response of servers and they both establish a reliable connection.

# What happens when you enter google.com in browser.

1. DNS resolution to get IP address of google.com.
2. TCP 3 way handshake to establish reliable connection.
3. TLS Handshake to make connection private and secure.
4. HTTP request is sent to server, server processes and returns a response.
5. Browser renders page by parsing html (DOM), CSS(CSSOM), render tree, calculating layout and painting.
6. Page is fully loaded.

# 2How does HTTP → HTTPS redirection happen?

    Even if the browser starts with HTTP:
    Server-side redirect:
        The HTTP request reaches the server.
        The server responds with a redirect:

        ```
        HTTP/1.1 301 Moved Permanently
        Location: https://google.com/
        ```

# Socket

- Is an endpoint of a communication channel between 2 machines
  Purpose
  1. Represents a combination of IP address+port number which uniquely identifies where data should be sent and received.
  2. Provides an interface to the OS
