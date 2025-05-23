id - used to find out more information about one's identity.

# Reading, writing and execution

File attributes when you run ls command:
Example

```
> ls -l
> drwxr-xr-x 11 root root 4096 Apr 4 02:09 var

```

First 10 characters represent file attributes
First character represents:

- A regular file.
  d - A directory.
  l - A symbolic link. Notice that with symbolic links, the remaining file attributes are always rwxrwxrwx and are dummy values. The real file attributes
  are those of the file the symbolic link points to.
  c - A character special file. This file type refers to a device that handles data
  as a stream of bytes, such as a terminal or /dev/null.
  b - A block special file. This file type refers to a device that handles data in
  blocks, such as a hard drive or DVD drive.

Remaining 9 characters represent permissions for the file owner, group and world.

# Permission attributes

    r   - allows a file to be opened and read.
        - allows a directory’s contents to be listed if the execute attribute is also set.

    w   - allows a file to be written to or truncated, doesnt allow file to
        be deleted/renamed. That depends on the directory attributes.
        - allows files within a directory to be created, deleted, and renamed if the execute attribute is also set.

    x   - allows a file to be treated as a program and executed.
        - allows a directory to be entered.

# Change file mode

Use chmod command to change the permissions of a file or directory.
Octal digits are used to set permissions

Octal Binary File mode
0 000 ---
1 001 --x
2 010 -w-
3 011 -wx
4 100 r--
5 101 r-x
6 110 rw-
7 111 rwx

# Common octal codes

7 (rwx), 6 (rw-), 5 (r-x), 4 (r--), and 0 (---).

We use 3 octal digits with chmod to set permissions
`> chmod 600 foo.txr` ( set rw permissions for file owner only)

chmod also supports a symbolic notation for specifying file modes.
Symbolic notation is divided into three parts.
• Who the change will affect
• Which operation will be performed
• What permission will be set

Symbol Meaning
u - Short for “user” but means the file or directory owner.
g - Group owner.
o - Short for “others” but means world.
a - Short for “all.” This is a combination of u, g, and o.

Some people prefer to use octal notation, and some folks really like the
symbolic.

# Umask

Used to set the default permissions given to a file when it is created.

`>umask 0000` - used to turn off the mask.

# Changing identities

su - used to start a shell as another user.

`> su [[-l]] [user]`

-l - if included, the resulting session is a login shell for the specified user.
if the user is not specified, the superuser is assumed.

sudo - used to execute commands as another user. Does not start a new shell or load a user's environment.

# Change file owner

chown is used to change owner and group owner of a file.

`> chown [owner][:[group]] file`

chgrp works the same but only for group ownership.

# Changing password

use passwd
