# Browser rendering engines

They turn resources of a webpage (HTML, CSS) into a visual representation on a screen.

# Browser components

1. UI - allows end users to interact with visual elements.
2. Browser engine - functions as a bridge between UI and rendering engine. Queries the rendering engine depending on inputs from UI.
3. Rendering engine - renders a specific webpage requested by users eg Blink, Webkit, Trident, Gecko
4. Networking - responsible for managing network calls
5. Javascript interpreter - parses and executes JS code embedded in a website.
6. Data storage - data persistence layer.

# Memory management

- Javascript automatically allocates and frees memory as required ( garbage collection)
- Javascript allocates memory when values are initially declared.
- Most memory management issues occur during the release phase.

# Garbage collection

1. Reference counting garbage collection - determines if an object's memory shoudl be freed by checking if other objects still have references to it. Circular references (two objects with properties that reference one another) are common causes of memory leaks.

2. Mark and sweep - determines if an object is no longer needed by starting from the roots (global object), the garbage collector will thus find all reachable objects and collect all non-reachable objects. Non reachable will be garbage collected.

# Cross Browser Compatibility

Cross-browser testing - practice of ensuring a website works correctly across different browsers and devices.

1. Compatibility issues

- Inadequate testing on real devices.
- HTML/CSS Validation (use code validating tools like HTML Validator to solve the problem.)
- Vendor specific functions ( use specific code in CSS depending on vendor eg -moz for Firefox)
- Browser specific features as each browser has its way of interpreting and displaying content.
- Outdated browser detection due to obsolete javascript.
- Media formats and codec issues - some browsers have limitations or require additional plugins.
- Challenges with polyfills (fallback solutions when certain browser features are not natively supported.) - use them only where needed

# Benefits of cross browser compatibility

1. Wider reach as site is accessible to more people.
2. Consistent UX as websites have a uniform look.
3. Better SEO - websites have better ranking from being more user friendly.

# Best practices for cross browser compatibility.

1. Use a DOCTYPE! to ensure standards mode is activated.
2. Use CSS Reset ( a set of rules that target common elements to remove their default styling)
3. Responsive UI Design
4. Do cross browser testing
5. Add polyfills
6. Use feature detection tools like Modernizr

# Progressive Web Apps

- Apps built using web technologies but behave like platform specific apps

Technical features of PWAs

1. Web manifest - provides the info that the browser needs to install the PWA.
2. Service workers (JS scripts running in the background that intercept network requests, cache assets, and enable offline mode.) - often used to provide an offline experience

# Benefits of PWAs

1. Installable without an app store
2. Smaller footprint compared to native apps.
3. Offline functionality.
4. Cross platform
5. Cheaper to maintain.
