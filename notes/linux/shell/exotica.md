# Group commands and subshells

Bash allows commands to be grouped together either in group commands or subshells.Group commands and subshells are useful when managing redirections or dealing with pipelines.

- Whereas a group command executes all of its commands in the
  current shell, a subshell (as the name suggests) executes its commands in a
  child copy of the current shell. Unless a script requires a subshell, group commands are preferred.

Group command: `{ command1; command2; [command3;...]}`
Subshell command: `(command1; command2; [command3;...])

Example

```
    { ls -l; echo "Listing foo.txt"; cat foo.txt; } > output.txt
    ( ls -l; echo "Listing foo.txt"; cat foo.txt; ) > output.txt
```

# List owners

echo "File owners:"
{ for i in "${!owners[@]}"; do
    printf "%-10s: %5d file(s)\n" "$i" "${owners["$i"]}"
done } | sort

echo

# List groups

echo "File group owners:"
{ for i in "${!groups[@]}"; do
    printf "%-10s: %5d file(s)\n" "$i" "${groups["$i"]}"
done } | sort

N/B

- Commands in pipelines are always executed in subshells, therefore any command that assigns a variable, the variable will be undefined in the next part of the pipeline.
  Process substitution works around this problem.
  Syntax: `<(list)` - for processes that produce a standard output.
  `>(list)` - for processes that intake standard input.
  where `list` is a list of commands.

` read < <(echo "foo")`

- Process substitution allows us to treat the output of a subshell as an
  ordinary file for purposes of redirection.

# Traps

Used to respond to signals eg add functionality for when a user logs off.
Syntax: `trap argument signal [signal...]`
argument - string that will be read and treated as a command.
signal - signal that will trigger the command

`trap "echo 'I am ignoring you.'" SIGINT SIGTERM`

# Asynchronous execution with wait

- Wait command is used to manage asynchronous execution. The wait command causes a parent script to pause until a specified process (i.e., the child script) finishes

# Named pipes

Used to create a connection between two processes
