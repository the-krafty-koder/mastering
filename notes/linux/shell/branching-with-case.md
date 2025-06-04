# Case command

Has the following syntax

```
case <word> in
    [pattern [| pattern]...) commands ;;]...
esac
```

Example

```
#!/bin/bash
# case-menu: a menu driven system information program
clear
echo "
Please Select:
1. Display System Information
2. Display Disk Space
0. Quit
"
read -p "Enter selection [0-3] > "
case "$REPLY" in
    0)  echo "Program terminated."
        exit
        ;;
    1)  echo "Hostname: $HOSTNAME"
        uptime
        ;;
    2)  df -h
        ;;
    *)  echo "Invalid entry" >&2
        exit 1
        ;;
esac
```

```
Table 31-1: case Pattern Examples
Pattern Description
a) Matches if word equals a.
[[:alpha:]]) Matches if word is a single alphabetic character.
???) Matches if word is exactly three characters long.
*.txt) Matches if word ends with the characters .txt.
*) Matches any value of word. It is good practice to include this as the
last pattern in a case command to catch any values of word that did not
match a previous pattern, that is, to catch any possible invalid values.
```

- You can also use multiple patterns by using |, eg

```
case "$REPLY" in
    a|B)  echo "Program terminated."
```

# Perfoming multiple actions

- You can attach multiple commands to a match by using the & pattern

```
case "$REPLY" in
    [[:lower:]])    echo "'$REPLY' is lower case." ;;&
    [[:alpha:]])    echo "'$REPLY' is alphabetic." ;;&
```

- If you enter 'a', both results will be printed
