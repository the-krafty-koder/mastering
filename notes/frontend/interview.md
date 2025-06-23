# HTML/CSS

- Semantic HTML: use of <section>, <main>, <article>, etc. for accessibility and SEO
- Form elements: <form>, <input>, <textarea>, <label>, <select>, <button>
- Input types: text, email, number, date, file, etc.
- Accessibility: proper use of <label>, aria-\* attributes, screen reader support, focus and tab ordera
- HTML5 features: audio/video tags, localStorage vs sessionStorage, drag-and-drop API
- Form validation: native attributes like required, pattern; custom messages
- CSS selectors: basic, combinator, pseudo-class (:hover), pseudo-element (::before)
- Specificity: how it's calculated, avoiding !important when possible
- Box model: content, padding, border, margin, box-sizing
- Positioning: static, relative, absolute, fixed, sticky; z-index and stacking
- Flexbox: display: flex, justify-content, align-items, common layout patterns
- Grid: display: grid, grid-template, grid-gap, grid-area for placement
- Responsive design: media queries, %, em, rem, vh, vw, mobile-first approach
- Animations: transition, animation, @keyframes, performance awareness
- CSS variables: --custom-properties for theming and reusability
- Preprocessors (optional): SCSS/SASS basics—variables, nesting, mixins

# Javascript

- Execution context and scope: global vs local, function vs block (var, let, const), lexical scope
- Closures: functions retaining access to outer variables, common in hooks, debounce/throttle
- this keyword: behavior in regular vs arrow functions, bind, call, apply
- Hoisting: differences between variables and functions, let/const hoisted but not initialized
- Promises & async/await: chaining, error handling, try/catch
- Event loop & concurrency: call stack, task queues, setTimeout, Promise, async order
- Array & object manipulation: map, filter, reduce, forEach, destructuring, spread/rest
- Type coercion & equality: == vs ===, truthy/falsy values, implicit coercion traps
- Higher-order functions: functions returning or accepting functions, used in hooks and events
- Prototypes & inheritance: prototype chain, class vs prototypal inheritance
- Modules: ES modules (import/export), named vs default exports
  ES6+ features: arrow functions, default params, optional chaining, Object.entries, etc.
- Memory management: garbage collection, closures causing memory leaks
- Immutability: updating nested structures immutably, important in React
- Currying & partial application: functional techniques for reusable utilities
- Custom iterators & generators: useful for advanced data handling scenarios

# Typescript

- Basic types: string, number, boolean, null, undefined, any, unknown, void, never
- Type inference and type annotations
- Interfaces vs types: differences, use cases, extending, merging
- Type aliases and union/intersection types
- Optional and readonly properties
- Function typing: return types, parameter types, optional/default parameters
- Generics: creating reusable, type-safe functions and components
- Type narrowing: typeof, instanceof, discriminated unions, type guards
- Enums: numeric and string enums, const enums
- Literal types: string/number literals, as const
- Utility types: Partial, Required, Pick, Omit, Record, ReturnType, Exclude, Extract
- Type assertions and casting
- Modules and namespaces
- Declaration merging and ambient types (.d.ts files)
- Working with third-party types (@types/...) and DefinitelyTyped
- Strict mode: strictNullChecks, noImplicitAny, etc.
- Structural typing (duck typing) and how TypeScript compares shapes
- Type compatibility and assignability rules
- Advanced types: conditional types, mapped types, template literal types
- Type vs interface in React props (if frontend-focused)

# React

- React fundamentals: components (functional and class), JSX syntax
- Props and state: passing data, managing local state
- Lifecycle methods (class components) and hooks (functional components)
- Common hooks: useState, useEffect, useContext, useReducer, useRef
- Component composition and children props
- Event handling and synthetic events
- Conditional rendering and list rendering (map, keys)
- Forms: controlled vs uncontrolled components
- Context API for state sharing
- React Router basics: routing, nested routes, navigation
- Performance optimization: memoization (React.memo, useMemo, useCallback)
- Error boundaries (class components)
- Higher-Order Components (HOCs) and Render Props patterns
- Portals for rendering outside the root DOM node
- Refs and DOM manipulation
- State management options: Redux, Zustand, Context + Reducer patterns
- Testing React components: Jest, React Testing Library basics
- Suspense and lazy loading components
- React 18 features: concurrent mode basics, automatic batching
- PropTypes vs TypeScript for prop validation

# GraphQL

- Basics: What is GraphQL, how it differs from REST
- Schema definition: types, queries, mutations, subscriptions
- Query syntax: fields, arguments, aliases, variables
- Mutations: modifying data and returning results
- Subscriptions: real-time data with WebSockets
- Types: scalar, object, enum, input types, interfaces, unions
- Resolvers: what they do, how they work, resolver chaining
- Fragments: reusable query parts
- Pagination strategies: cursor-based, offset-based
- Error handling in GraphQL
- Schema stitching and federation (for microservices)
- Authentication and authorization in GraphQL APIs
- Performance optimization: batching, caching, persisted queries
- Tools and libraries: Apollo Client/Server, Relay, GraphQL Yoga
- Introspection and tooling (GraphiQL, Playground)
- Differences between client-side and server-side GraphQL
- Versioning strategies (or lack thereof) in GraphQL
- Security concerns: query depth limiting, complexity analysis

# Perfomance optimization

- Performance Optimization
- Critical rendering path
- Browser rendering lifecycle
- Minimizing repaint and reflow
- Lazy loading images and components
- Code splitting
- Caching strategies (HTTP caching, service workers)
- Lighthouse audits and common performance metrics (FCP, LCP, TTI)
- Webpack performance optimizations (tree shaking, code splitting)

# Testing

- Unit testing fundamentals
- Jest, Mocha, Jasmine
- Testing DOM with React Testing Library or Enzyme
- End-to-end testing (Cypress, Selenium, Puppeteer)
- Snapshot testing
- Mocking and stubbing

# Networking & Security

- HTTP protocol basics (methods, headers, status codes)
- RESTful APIs and GraphQL basics
- CORS and CSRF basics
- HTTPS, TLS/SSL basics
- Content Security Policy (CSP)
- OAuth, JWT, and authentication basics

# Browser and Environment

- Browser rendering engines
- Event loop and task queues (macro and microtasks)
- Memory management and garbage collection
- Cross-browser compatibility and polyfills
- Web Accessibility (WCAG guidelines)
- Web Components basics (Shadow DOM, Custom Elements)
- Progressive Web Apps (PWA) fundamentals
