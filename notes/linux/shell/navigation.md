# Commands

date - show current date
cal - show calendar
df - show free disk space
free - show free memory
exit - end a terminal session
pwd - display current working directory
ls - list the contents of a directory
ls <dir> <dir> - list contents of multiple directories.
ls -l -> list contents in long format.
ls -t - sort contents by modification time.
ls -lt -> list contents in long format while sorting by modification time.
ls --reverse -> reverse the order of the sort.
cd <pathname> - change the current working directory.
cd - -> go to previous working directory.

# Ls -l command

`wayneomoga@Waynes-MacBook-Pro CSV % ls -l
total 16
-rw-r--r--@ 1 wayneomoga  staff  128 Feb 18  2024 file1.csv
-rw-r--r--@ 1 wayneomoga  staff  150 Feb 18  2024 file2.csv`

-rw-r--r--@ -> access rights of the file
wayneomoga - owner of the file
staff - group that owns the file
128 - size of file in bytes
Feb 18 2024 - date the file was last modified.
file1.csv -> name of the file.

# Determining a File’s Type with file

Filenames in linux are not required to reflect a files contents

```
file <filename> - prints a brief description of the files contents.
```

# Viewing files

etc/passwd - File that defines all the systems user accounts

```
    less <filename> - view contents of filename
    Once opened, the following commands are available
        q - quit less
        /new - search for new
        n - search for next occurrence of search parameter
        h - display help screen
        G - move to the end of text file.

```

# Directories on linux systems

/ -> root directory
/bin -> contains binaries that the system needs to boot and run.
/boot -> contains the linux kernel, initial RAM disk image and the boot loader.
/dev - special directory that contains device nodes
/etc - contains all system wide configuration files
/home - each user is given a directory in /home
/lib - contains shared library files used by the core system programs
/opt - used to install "optional" software
/proc - virtual file system maintained by the linux kernel.
/usr - contains all programs and support files used by regular users
/usr/local - where programs that are not included with
your distribution but are intended for system-wide use are installed.
/usr/bin - contains executable programs installed by your linux distribution.
/usr/sbin - contains more system administration programs.
/usr/lib - shared libraries for program in /usr/bin
/usr/share - contains all the shared data used by programs in /usr/bin.
This includes things such as default configuration files, icons, screen
backgrounds, sound files, and so on.
/usr/share/doc - Most packages installed on the system will include some kind of documentation. In /usr/share/doc, we will find documentation files organized by package.
/tmp - storage of temporary, transient files created by programs.
/var - storage for data that is likey to change. Various databases,
user mail are stored here.
/var/log - contains log files, records of various system activity.

# Symbionic link

Having a file referenced by multiple names.
