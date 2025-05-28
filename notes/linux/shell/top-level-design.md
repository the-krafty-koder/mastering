# Top level design

The act of identifying the top level steps and increasingly developing detailed views of those steps.

# Shell functions

Mini scripts found in other scripts.

```
name () {
    commands
    return
}
```

# Local variables

Defined within functions by using `local`

```
hello_world () {
    local hello=3
    echo "$hello"
}
```
