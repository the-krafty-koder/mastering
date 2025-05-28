# if statements

```
if <cond>; then <action>
else <action>
fi
```

or
`if <cond>; then <action>; else <action>; fi`

# Exit status

When commands run, they issue an exit status (usually a number between 0-255, 0 being success, others failure) when they terminate.

```
root@ffb5b2dd183b:/# ls -d /usr/bin
/usr/bin
root@ffb5b2dd183b:/# echo $?
0
```

# Using test

The command commonly used with if is test. Has 2 forms

`test [expression]` and `[expression]`

- The test command returns an exit status of 0 when true and 1 when false

File expressions
Expression Is true if:
file1 -ef file2 file1 and file2 have the same inode numbers (the two filenames
refer to the same file by hard linking).
file1 -nt file2 file1 is newer than file2.
file1 -ot file2 file1 is older than file2.
-b file file exists and is a block-special (device) file.
-c file file exists and is a character-special (device) file.
-d file file exists and is a directory.
-e file file exists.
-f file file exists and is a regular file.
-g file file exists and is set-group-ID.
-G file file exists and is owned by the effective group ID.
-k file file exists and has its “sticky bit” set.
-L file file exists and is a symbolic link.
-O file file exists and is owned by the effective user ID.
-p file file exists and is a named pipe.
-r file file exists and is readable (has readable permission for the effec-
tive user).
-s file file exists and has a length greater than zero.
-S file file exists and is a network socket.
-t fd fd is a file descriptor directed to/from the terminal. This can be
used to determine whether standard input/output/error is being
redirected.
-u file file exists and is setuid.
-w file file exists and is writable (has write permission for the effective
user).
-x file file exists and is executable (has execute/search permission for
the effective user).

String expressions
Expression Is true if:
string ->string is not null.
-n string -> The length of string is greater than zero.
-z string -> The length of string is zero.
string1 = string2
string1 == string2 ->
string1 and string2 are equal. Single or double equal signs
may be used. The use of double equal signs is greatly pre-
ferred, but it is not POSIX compliant.
string1 != string2 -> string1 and string2 are not equal.

string1 > string2 -> string1 sorts after string2.
string1 < string2 -> string1 sorts before string2.

Integer Expressions
Table 27-3: test Integer Expressions
Expression Is true if:
integer1 -eq integer2 integer1 is equal to integer2.
integer1 -ne integer2 integer1 is not equal to integer2.
integer1 -le integer2 integer1 is less than or equal to integer2.
integer1 -lt integer2 integer1 is less than integer2.
integer1 -ge integer2 integer1 is greater than or equal to integer2.
integer1 -gt integer2 integer1 is greater than integer2.

# Control operators, another way to branch

Bash provides 2 control operators that can perform branching: && and ||

- With the && operator, command1 is executed, and command2 is executed if, and only if, command1 is successful. With the || operator, command1 is executed and command2 is executed if, and only if, command1 is unsuccessful.
