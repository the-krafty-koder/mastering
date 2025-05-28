# How to write a shell script

1. Write the script
2. Make the script executable
3. Put the script somewhere the schell can find it.

# Shebang

The #! character sequence is a special construct called the shebang. It is used to tell the kernel the name of the interpreter that should be used to execute the script that follows, eg

`#!/bin/bash`

# Executable permissions

Scripts are made executable using chmod. `chmod 755` for scripts that everyone can execute and `chmod 700` for scripts that only the owner can execute.

# Script file location

For a script to run, we must precede the script name with an explicit path eg `./hello_world`

# () - Designed for integers

(()) is used to perform arithmetic truth tests. An arithmetic truth test
results in true if the result of the arithmetic evaluation is non-zero.

# Combining expressions

Table 27-4: Logical Operators

    Op      test        [[]] and (( ))
    AND     -a          &&
    OR      -o          ||
    NOT     !           !
