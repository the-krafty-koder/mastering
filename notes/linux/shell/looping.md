# While loop

Syntax is `while <commands>;do <commands>; done`

```
#!/bin/bash

# count in loop

while [[ $count -le 5 ]]; do
        echo "$count"
        count=$((count + 1))
done
echo "Finished"
```

# Breaking out of a loop

`break` command immediately terminates a loop, and control moves to the next statement after the loop.
`continue` skips the current iteration and moves to the next iteration of the loop.

# Until

Works like a while loop, except instead of exiting when a zero exit status is encountered ( evaluates to true), it does the opposite.

```
#!/bin/bash

# count in loop

until [[ $count -gt 5 ]]; do
        echo "$count"
        count=$((count + 1))
done
echo "Finished"
```

# Reading files with loops

Files can be processed with while and until loops. To redirect a file to a loop, we place the redirection operator after the done statement. The read command exits after each line is read, with a zero exit status, when it reads the last line it returns a non-zero exit status, thereby terminating the loop.

```
#!/bin/bash
# while-read: read lines from a file
while read distro version release; do
printf "Distro: %s\tVersion: %s\tReleased: %s\n" \
"$distro" \
"$version" \
"$release"
done < distros.txt
```

- We can also pipe standard input into a loop

```
#!/bin/bash
# while-read2: read lines from a file
sort -k 1,1 -k 2n distros.txt | while read distro version release; do
printf "Distro: %s\tVersion: %s\tReleased: %s\n" \
"$distro" \
"$version" \
"$release"
done
```
