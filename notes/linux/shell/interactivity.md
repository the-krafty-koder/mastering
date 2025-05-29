# Read

Used to read values from standard input.
`read [options] [variable]`
If read receives fewer variables than the expected number, the extra variables are empty, while an excessive amount results in the final variable containing extra output.

`read var1 var2 var3` - reading multiple variables

- If no variable is listed after the read command, a shell variable `REPLY` will hold the data.

Table 28-1: read Options
Option Description
-a array Assign the input to array, starting with index zero.
-d delimiter The first character in the string delimiter is used to indicate the end of input, rather than a newline character.
-e Use Readline to handle input. This permits input editing in the same
manner as the command line.
-i string Use string as a default reply if the user simply presses enter. Requires
the -e option.
-n num Read num characters of input, rather than an entire line.
-p prompt Display a prompt for input using the string prompt.
-r Raw mode. Do not interpret backslash characters as escapes.
-s Silent mode. Do not echo characters to the display as they are
typed. This is useful when inputting passwords and other confiden-
tial information.
-t seconds Timeout. Terminate input after seconds. read returns a non-zero exit
status if an input times out.
-u fd Use input from file descriptor fd, rather than standard input.

Script that reads a password and times out if password isnt entered in 10s

```
#!/bin/bash

# reads secrets

if read -t 10 -p "Enter password -> " passcode ; then
        echo -e "Password is '$passcode'";
else    echo -e "\nTimed out" >&2
        exit 1
fi
```

- The internal file seperator (IFS) of read seperates inputs by space, tab or newline character into different variables. You can change the delimiter IFS uses by
  in the script
  `IFS=':'`

# Validating input

It is important to perform validation checks against inputs.

```
#!/bin/bash

# validating inputs


invalid_input () {
        echo "Invalid input '$REPLY'" >&2
        exit 1
}

read -p "Enter a single item -> "

[[ -z "$REPLY" ]] && invalid_input

(( $(echo "$REPLY" | wc -w) > 1 )) && invalid_input
```

# Menu

```

clear
echo "
Please make a selection:

1. Display system information
2. Display disk space
0. Quit
"

read -p "Enter selection [0-3] -> "

if [[ "$REPLY" =~ ^[0-3]$ ]]; then
        if [[ "$REPLY" == 0 ]]; then
                echo "Program terminated"
                exit
        fi
        if [[ "$REPLY" == 1 ]]; then
                echo "$HOSTNAME"
                uptime
                exit
        fi
        if [[ "$REPLY" == 2 ]]; then
                echo "$(df -h)"
                exit
        fi
else
        echo "Invalid entry"
        exit 1
fi
```
