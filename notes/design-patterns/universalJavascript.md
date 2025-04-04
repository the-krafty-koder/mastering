# Module bundler

Takes the source code of an application (entry module and its dependencies) and produces one or more bundle files.

# Transpiler

Converts source code from modern Javascript versions to older versions (eg es5) for compatibility with older browsers

# How module bundler works

- A 2 step process

  ## Dependency Resolution

  Has the goal of traversing the codebase from the entrypoint, discovering all dependencies and building a dependency graph. The module bundler builds a data structure called a modules map. The modules map contains file path as key and a representation of the module source code as values.

  ## Packing

  The bundler takes the modules map and converts it into a single executable
  bundle ( a single JS file containing all business logic of the app).
