# Event propagation

Defines the journey of an event across the document object model, dictating
how and when different elements respond to user actions.

## Phases

1. Capturing
   The event travels down from the window object to the targeted DOM element.
2. Target
   Event reaches the element. The event listeners on the element are executed here
3. Bubbling
   After reaching the target, the event travels back up to the window object. When a click happens on a child element, the event handlers on the parent are also called up until the root DOM object
   ### Methods to stop bubbling.
   1. event.stopPropagation : stops the event from bubbling up to parent
      elements, ensuring only the event handler for the target element is
      executed.
   2. event.stopImmediatePropagation: stops the event from bubbling
      parent element and also any other events on the element from being
      executed.

# Web storage

- Data is stored on the client's browser.
- Has 2 APIs:
  Localstorage - stores data without an expiration
  Session storage - stored data with an expiration ( once browser tab is closed, data is lost)

  ```
    localStorage.setItem("id", "245")
    localStorage.getItem("id")
  ```

  N/B
  IndexedDB - more powerful client storage (compared to local storage) built into the browser. Can store large amounts of structured data, organised by (key, value).It is also transcaction based for better reliability.

# Websocket

Provides a way to open a two way interactive communication session between a
client and a server. Requests dont have to be sent first to get a response.
You can just listen to the server and it will send you a message when it’s available.

# CSS Specificity

Inline styles > Id > Classes and pseudoclasses > Attributes > Element

# Combinators

A b -> selects all descendants of A whether child or subchild
A > b -> selects all DIRECT descendants of A that are A, not subchild
A + b -> selects all adjascent siblings (selects the next b that comes immediately after A)
A ~ b -> selects general siblings (all b that exists after A)

# Responsive Design

A techniques used to modify the display of contents of a web page and make it look good depending on the viewport.

    - Viewport
    Using the <meta> tag to set the width and initial scale of the page
    - Grid
    A way to render elements in form of rows and columns
    set the grid via css attribute
        ` grid-template-areas: left main main main main right`
    Assign via
        `grid-area: main`
    - Media queries
    Used to define different styling for a page depending on screen size
    Ex `@media only screen and (max-width: 600px) {

            body {
            background-color: lightblue;
        }
    }`

# Critical Rendering Path

Defines the steps involved until a webpage starts rendering in the browser

## Steps

HTML Parsing -> DOM : browser reads html and constructs tree
CSS Parsing -> CSS Object model : browser downloads and parses CSS to form obj model
Render Tree Construction
-Combines DOM and CSSOM to form the Render Tree, which determines what gets displayed.
Layout Calculating
-The browser calculates the size and position of elements based on styles.
Painting and Compositing
The browser paints pixels to the screen.

## Perfomance optimization in HTML and CSS

1. Minimize HTML Size - Reduce unnecessary elements and comments.
2. Defer non-essential scripts - use defer or async for JS files to avoid blocking HTML parsing.
3. Minify CSS → Remove whitespace and comments.
4. Use compressed images (webpn for png/jpeg)
5. Lazy load images (use loading='lazy') and iframes

# Handle browser compatibility

- Use feature detection tools like Modernizr to check if features are
  supported before using.
- Use CSS resets or normalize css to reduce style differences across
  browsers.
- Cross browser testing using tools like Browserstack
- Add fallbacks for older browsers such as polyfills in js or
  @support in CSS

# Single Page Applications

Apps that load a single HTML Page and dynamically update page data
without refreshing the page.
