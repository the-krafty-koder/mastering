# Compression algorithms

1. Lossless - preserves all the data in the original.
2. Lossy - removes data from the original as the compression is perfomed to allow more compression to be applied.

# Gzip

Used to compress one or more files.

- Gunzip used to perform the reverse.

Table 18-1: gzip Options
Option Long option Description

1. -c --stdout
   --to-stdout
   Write output to standard output and keep the original files.
2. -d --decompress
   --uncompress
   Decompress. This causes gzip to act like gunzip.
3. -f --force Force compression even if a compressed version of the
   original file already exists.
4. -h --help Display usage information.
5. -l --list List compression statistics for each file compressed.
6. -r --recursive If one or more arguments on the command line is a direc-
   tory, recursively compress files contained within them.
7. -t --test Test the integrity of a compressed file.
8. -v --verbose Display verbose messages while compressing.

# Bzip

- Works like gzip but uses a different compression algorithm that achieves higher levels of compression but runs slower.

`bzip2 foo.txt`

- All options used in gzip are also supported in bzip2

# Archiving

Gathering up many files and including them in one file.

## Tar

Use `tar <mode[options]> <pathname>` to archive a bunch of files.

Table 18-2: tar Modes
Mode Description
c Create an archive from a list of files and/or directories.
x Extract an archive.
r Append specified pathnames to the end of an archive.
t List the contents of an archive.

f - an option to name the tar archive.

`tar cf <name-of-tar-file> <directory-name-to-archive>` - archive a directory
`tar xf <file-name>` - extract a tar file
`tar xf <filename> <specific-file>` - extract a specific file within the tar.

- tar can be used in conjunction with find to produce archives.
  `find playground -name 'file-A' -exec tar rf playground.tar '{}' '+'`

## Zip

Zip is both a compression and an archive tool

`zip <options> <zipfile> <file>`
`zip -r playground.zip playground`

# Synchronizing files and directories

Use rsync to synchronize files and directories
`rsync <options> <source> <destination>`
eg `rsync -av playground foo` -archive and sync files in playground and foo dir in the verbose format
