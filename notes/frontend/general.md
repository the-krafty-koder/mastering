# Difference between em and rem

Em is relative to the the size of its parent element
Rem is relative to the size of the root element

# Graceful degradation

A strategy that ensures a website remains functional even when certain features are not supported by older browsers.

# Advantages and disadvantages of CSS preprocessors

Advantages
CSS is made more maintainable
Easy to write nested selectors.
Variables for consistent theming.
Mixins(they take arguments and applies rules dependent on these arguments to selectors) to generate repeated CSS.
CSS files can be split into multiple files. (modularity)

Disadvantages
Requires preprocessing which adds to recompilation time.

# What is the difference between <script>, <script async>, and <script defer>

<script> -> execute first before displaying remaining page content.
<script async> -> script downloads in parallel with HTML parsing. Once downloaded, it executes immediately even if HTMl hasnt finished parsing. Great for independent scripts that dont depend on the DOM.
<script defer> -> script downloads in parallel with HTML parsing. Execution is deffered until HTML parsing is complete. Ideal for scrips that depend on the DOM.
