# Nl

Used to number lines. Similar to `cat -nl`

# fold

- Used to wrap each line to a specific length. Accepts either files or standard output. If no width is specified, the default width is 80. The addition of the -s option will cause fold to break the line at the last available space before the line width is reached.

```
root@638bcd2d1960:/# echo "The quick brown fox jumped over the lazy dog" | fold -w 12
The quick br
own fox jump
ed over the
lazy dog
root@638bcd2d1960:/#
```

# fmt

Also folds text, plus a lot more

`fmt -w 50 fmt-info.txt` - fold lines to width 50

Option Description
-c Operate in crown margin mode. This preserves the indentation of the
first two lines of a paragraph. Subsequent lines are aligned with the
indentation of the second line.
-p string Format only those lines beginning with the prefix string. After formatting,
the contents of string are prefixed to each reformatted line. This option
can be used to format text in source code comments. For example, any
programming language or configuration file that uses a # character to
delineate a comment could be formatted by specifying -p '# ' so that
only the comments will be formatted. See the example that follows.
-s Split-only mode. In this mode, lines will only be split to fit the specified
column width. Short lines will not be joined to fill lines. This mode is use-
ful when formatting text such as code where joining is not desired.
-u Perform uniform spacing. This will apply traditional “typewriter-style”
formatting to the text. This means a single space between words and
two spaces between sentences. This mode is useful for removing justifi-
cation, that is, text that has been padded with spaces to force alignment
on both the left and right margins.
-w width Format text to fit within a column width characters wide. The default is
75 characters. Note: fmt actually formats lines slightly shorter than the
specified width to allow for line balancing.

# pr

- Used to paginate text for printing.

`pr -l 15 -w 65 distro.txt` - the -l option (for page length) and the -w
option (page width) to define a “page” that is 65 columns wide and 15 lines
long

# printf

-Mostly used in scripts.
`printf "I formatted the string: %s\n" foo`

Table 21-4: Common printf Data Type Specifiers
Specifier Description
d Format a number as a signed decimal integer.
f Format and output a floating-point number.
o Format an integer as an octal number.
s Format a string.
x Format an integer as a hexadecimal number using lowercase a to f where
needed.
X Same as x but use uppercase letters.
% Print a literal % symbol (i.e., specify %%).
