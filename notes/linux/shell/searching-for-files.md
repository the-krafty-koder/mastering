# Locate

Use the locate command to search for a pathname and then outputs every name that matches a substring.

`locate <pathname>`

- For more complicated searches, combine locate with zip
  `locate zip | grep bin`

# Find

Searches a directory for files based on a variety of attributes.
`find <directoryname>`

`find ~ -type d | wc -l ` - find the number of directories only in ~

find File Types
File type Description
b Block special device file
c Character special device file
d Directory
f Regular file
l Symbolic link

find Size Units
Character Unit
b 512-byte blocks. This is the default if no unit is specified.
c Bytes.
w 2-byte words.
k Kilobytes (units of 1,024 bytes).
M Megabytes (units of 1,048,576 bytes).
G Gigabytes (units of 1,073,741,824 bytes).

## Find tests

-cmin n - Match files or directories whose content or attributes were last modi-
fied exactly n minutes ago. To specify less than n minutes ago, use -n,
and to specify more than n minutes ago, use +n.
-cnewer - file Match files or directories whose contents or attributes were last
modified more recently than those of file.
-ctime n - Match files or directories whose contents or attributes were last
modified n*24 hours ago.
-empty - Match empty files and directories.
-group name - Match file or directories belonging to belonging to group name.
name may be expressed may be expressed either as a group name
or as a numeric group ID.
-iname - pattern Like the -name test but case-insensitive.
-inum n - Match files with inode number n. This is helpful for finding all the
hard links to a particular inode.
-mmin n - Match files or directories whose contents were last modified
n minutes ago.
-mtime n - Match files or directories whose contents were last modified
n*24 hours ago.
-name - pattern Match files and directories with the specified wildcard pattern.
-newer - file Match files and directories whose contents were modified more
recently than the specified file. This is useful when writing shell
scripts that perform file backups. Each time you make a backup,
update a file (such as a log) and then use find to determine which
files have changed since the last update.
-nouser - Match file and directories that do not belong to a valid user. This
can be used to find files belonging to deleted accounts or to detect
activity by attackers.
-nogroup - Match files and directories that do not belong to a valid group.
-perm mode - Match files or directories that have permissions set to the specified
mode. mode can be expressed by either octal or symbolic notation.
Test Description
-samefile name - Similar to the -inum test. Match files that share the same inode
number as file name.
-size n - Match files of size n.
-type c - Match files of type c.
-user name - Match files or directories belonging to user name. The user may be
expressed by a username or by a numeric user ID.

# Predefined find actions

Used to act on results returned by find.

-> -delete -> delete the currently matching file.
-> -ls -> Perform the equivalent of ls -dils on the matching file. Output is sent to standard output.
-> -print -> output the full pathname of returned results to standard output
-> -quit -> quit once a match has been made.

# User defined actions

The user can define actions to run on the result set via the following:
`-exec <command> '{}' ';'`
Example
`find . -type d -exec ls -l '{}' ';'`
N/B- '{}' represents the current directory, while ';' is a delimiter to signify the end of the command

- The above command runs the `ls -l` command each time there is a match ( a directory has been found). To have the `ls -l` command run once for all matches, use the following
  `find . -type d -exec ls -l '{}' +` - note the + sign difference.

# Xargs

It accepts inputs from the standard input and converts it into an arguments list for a specified command.

Running the `find . -type d -exec ls -l '{}' +` command using xargs would be

`find . -type d | xargs ls -l`

# Find options

Option Description
-depth -> Direct find to process a directory’s files before the directory itself. This option is automatically applied when the -delete action is specified.
-maxdepth -> levels Set the maximum number of levels that find will descend into a directory tree when performing tests and actions.
-mindepth -> levels Set the minimum number of levels that find will descend into a directory tree before applying tests and actions.
-mount -> Direct find not to traverse directories that are mounted on other file systems.
-noleaf -> Direct find not to optimize its search based on the assumption that it is searching a Unix-like file system. This is needed when scanning DOS/Windows file systems and CD-ROMs.
