# Improving accessibility

1. Using semantic html

   - <header>, <nav>, <main>, <section>, <footer> for structure
   - using <button> for clickable elements
   - headings (<h1> to <h6>) should follow a logical hierarchy

2. Using keyboard navigation

   - all interactive elements (links, buttons, forms) should be navigated by the tab key

3. Providing sufficient color contrast (4:5:1 ratio for text)
4. Labelling all inputs (<label for="id">) for screen readers to identify easily
5. Add alternative text for images
6. Providing captions and transcriptions for media
7. Responsive design to ensure text is resizable

# Concerns to be aware of when using iconography

1. Maintain uniform style – Icons should follow a consistent design language (e.g., outline vs. filled, rounded vs. sharp).
2. Provide alternative text (aria-labels) – Screen readers should be able to describe the icon’s function
3. Use universally recognized symbols – Icons like a trash bin (delete) or a magnifying glass (search) are more intuitive.
4. Ensure adequate contrast – Icons should stand out against the background for visibility.
5. Avoid icon overload – Too many icons without clear meaning can overwhelm and clutter the interface.

# How the Accessibility Tree Works

The Browser Parses the DOM
When a web page loads, the browser constructs the DOM Tree (HTML elements).

Semantic Information is Extracted
The browser gathers ARIA attributes, roles, labels, and interactive elements.

The Accessibility Tree is Generated
Only meaningful elements (headings, buttons, links, form fields, etc.) are included.Purely decorative elements (<div>, <span>, or aria-hidden="true") are excluded.

Assistive Technologies Use the Accessibility Tree
Screen readers, braille displays, and voice control software rely on this tree to describe content and allow navigation.

# Focus trap

A focus trap is a technique used in web development to restrict keyboard focus within a specific area of a webpage, preventing users from navigating outside of it until an action is completed. This is especially important for modals, dialogs, and other overlays, ensuring that users—especially those using keyboard navigation or assistive technologies—stay within the intended interaction zone.

# Principes of UI Design

- Consistency
- Accessibility
- Simplicity
- User centered design
- Feedback to the user eg via forms
-
