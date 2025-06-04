# Accessing the command line.

- The shell provides positional parameters that hold individual words. The variables are named 0 through to 9.

```
#!/bin/bash


echo "

\$0 = $0
\$1 = $1
\$2 = $2
"
```

# Determining the number of arguments

- The variable `$#` contains the number of arguments on the command line.

# Shift - getting access to many arguments

- The shift command causes all the parameters to “move down one”
  each time it is executed.

Suppose arguments are entered like so:
`./posit *` - wildcard expands to 82 args.

```
#!/bin/bash
# posit-param2: script to display all arguments
count=1

while [[ $# -gt 0 ]]; do
    echo "Argument $count = $1"
    count=$((count + 1))
    shift
done
```

# Handling positional parameters en masse

```
Table 32-1: The * and @ Special Parameters
Parameter Description
$* Expands into the list of positional parameters, starting with 1. When
surrounded by double quotes, it expands into a double-quoted string
containing all of the positional parameters, each separated by the first
character of the IFS shell variable (by default a space character).
$@ Expands into the list of positional parameters, starting with 1. When sur-
rounded by double quotes, it expands each positional parameter into a
separate word as if it was surrounded by double quotes.
```

```
#!/bin/bash
# posit-params3: script to demonstrate $* and $@
print_params () {
echo "\$1 = $1"
echo "\$2 = $2"
echo "\$3 = $3"
echo "\$4 = $4"
}
pass_params () {
echo -e "\n" '$* :'; print_params $*
echo -e "\n" '"$*" :'; print_params "$*"
echo -e "\n" '$@ :'; print_params $@
echo -e "\n" '"$@" :'; print_params "$@"
}
pass_params "word" "words with spaces"
```
