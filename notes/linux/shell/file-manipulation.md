# Common commands

```
    cp - copy file and directories
    mv - move " "
    mkdir - create directories
    rm - remove files and directories
    ln - create hard and symbolic links
```

# Wildcards

```
 * - matches any characters
 ? - matches any single character
 [characters] - matches any character that is a member of the set of characters
 [!characters] - matches any character that is not a member of the set of characters
 [[:class:]] - matches any character that is a member of the specified class
```

# Character classes

[:alnum:] - matches any alphanumeric characters
[:alpha:] - matches any alphabetic characters
[:digit:] - matches any numeral
[:lower:] -matches any lowercase characaters
[:upper:] - matches any uppercase characaters

# Copy options

```
    cp <directory1> <directory2>
```

-r -> recursively copy directories and their contents.
-u -> when copying, only copy files that either dont exist or are newer
than the existing corresponding files in the destination directory.
-v -> display informative messages as the file is being copied.

# Move

```
    mv <path> <path>
```

-r -> recursively move directories and their contents.
-u -> when move, only move files that either dont exist or are newer
than the existing corresponding files in the destination directory.
-v -> display informative messages as the file is being copied.

# Remove

```
    mv <path> <path>
```

-r -> recursively delete directories and their contents.
-f -> ignore non-existent files and do not prompt.
-v -> display informative messages as the file is being copied.

# Create links

```
ln <file> <link> - creates a hard link
ln -s <file> <link> - creates a symbolic link

```

Hard links cannot span physical devices
Hard links cannot reference directories, only files.

Symbolic links are a special type of file that contains a text pointer to the target file or directory.
