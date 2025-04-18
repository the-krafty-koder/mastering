# Redirecting standard output

We use the > command to redirect output from sdout to a file
`ls -l /usr/bin > ls-output.txt`

# Truncating an existing file

`> ls-output.txt` - This will rewrite file content

# Appending redirected output to an existing file

We use the >> command
`ls -l /usr/bin >> ls-output.txt`

# Redirecting standard error

We use > in combination with the file descriptor for stderr (2)
`ls -l /bin/usr 2> ls-error.txt`

# Redirecting to both standard output and input

We use the &>

`ls -l /usr/local &> ls-both.txt`
`ls -l /bin/usr &>> ls-output.txt` - append to a single file

# Suppressing errors from a command

/dev/null is a holding bucket - will hold messages without doing anything
`ls -l /bin/usr 2> /dev/null`

# Redirecting standard input

cat - Reads a file and copies result to standard output (often used to display short text files)

`cat > <filename>` - obtain text from standard input and save to the file.
`cat < <filename>` - get data from filename and display it on standard output
`cat filename` - display contents of filename on standard output

# Pipeline

Using | , the standard output of one command can be piped into the standard input of another. Example

`ls -l /usr/bin | less` - less accepts standard input.

# Filters

Placing several commands together into a pipeline.

`ls /bin /usr/bin | sort | less`

# Uniq

Used to remove duplicates from an input passed to it.(either standard input or a single filename argument) Normally used in conjunction with sort
`ls /bin /usr/bin | sort | uniq | less`

# Wc

Used to display the number of lines, words and bytes contained in a file.
-l flag is used to report only lines.

`wc <filename>`
`ls /bin /usr/bin | sort | uniq | less | wc -l` - find unique number of files in those folders

# Grep

Used to find text patterns within a file.
-i causes grep to ignore case when perfoming the search.
-v tells grip to only

`grep <pattern> <filename>`
`ls /bin /usr/bin | sort | uniq | less | grep zip` - list files containing zip in their file name from the respective folders.
