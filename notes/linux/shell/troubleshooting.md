# Watch out for filenames

Always precede wildcard (\*) statements with a './' to prevent misinterpretation by commands.

# Debugging

- Narrow down to a section causing an error by commenting out other areas.
- Use tracing i.e adding informative messages at every logical step of the code.
- You can also add tracing by setting the x option to bash
  `#!/bin/bash -x`
- To perform a trace on a selected portion of a script, rather than the
  entire script, we can use the set command with the -x option.
  `set -x # Turn on tracing`
  `set +x # Turn off tracing`
