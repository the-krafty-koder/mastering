# Cat

-Options
-A -> used to represent characters other than text eg tab
-n -> used to number lines
-s -> used to supress the output of multiple blank lines

# Sort

Sorts the contents of standard input and sends the result to standard output
`sort > foo.txt`
-It is possible to merge multiple files into a single sorted file
`sort file1.txt file2.txt file3.txt > whole.txt`

Sort options
Option Long option Description
-b --ignore-leading-blanks By default, sorting is performed on the entire
line, starting with the first character in the line.
This option causes sort to ignore leading
spaces in lines and calculates sorting based on
the first non-whitespace character on the line.
-f --ignore-case Make sorting case-insensitive.
-n --numeric-sort Perform sorting based on the numeric evalua-
tion of a string. Using this option allows sorting
to be performed on numeric values rather than
alphabetic values.
-r --reverse Sort in reverse order. Results are in descending
rather than ascending order.
-k --key=field1[,field2] Sort based on a key field located from field1
to field2 rather than the entire line. See the
following discussion.
-m --merge Treat each argument as the name of a presorted
file. Merge multiple files into a single sorted
result without performing any additional sorting.
-o --output=file Send sorted output to file rather than standard
output.
-t --field-separator=char Define the field-separator character. By d

`sort -k 1 -k 2n distro.txt` - sort by key, first alphabetically then by numerical value

# Uniq

When given a sorted file, it removes any duplicates. For uniq to do its job, the inputs must be sorted first.

`sort foo.txt | uniq`

Options

Option Long option Description
-c --count Output a list of duplicate lines preceded by the number
of times the line occurs.
-d --repeated Output only repeated lines, rather than unique lines.
-f n --skip-fields=n Ignore n leading fields in each line. Fields are separated
by whitespace as they are in sort; however, unlike sort,
uniq has no option for setting an alternate field separator.
-i --ignore-case Ignore case during the line comparisons.
-s n --skip-chars=n Skip (ignore) the leading n characters of each line.
-u --unique Output only unique lines. Lines with duplicates are
ignored.

# Slicing and dicing

## Cut

Used to extract a section of text from a line and output it to standard output. It is best used to extract text from files created by other programs

Options
Option Long option Description
-c list --characters=list Extract the portion of the line defined by list. The
list may consist of one or more comma-separated
numerical ranges.
-f list --fields=list Extract one or more fields from the line as defined by
list. The list may contain one or more fields or field
ranges separated by commas.
-d delim --delimiter=delim When -f is specified, use delim as the field delimit-
ing character. By default, fields must be separated by
a single tab character.
--complement Extract the entire line of text,

`cut -d ':' -f 1 /etc/passwd | head` - extract the first field from the file using : delimiter

# Paste

It adds one or more columns of text to a file. Does the opposite of paste. Like cut, it accepts multiple files as arguments.

`paste distro-dates.txt distro-versions.txt` - place the column in distro-dates before columns in distro-versions.txt

# Join

Joins data from multiple files based on a shared key field. Key field must be sorted for join to work properly.

`join  distro-key-names.txt distro-key-vernums.txt | head` - both files share a common column

# Comparing text

## comm

Compares 2 text files and displays the lines that are unique to each one and the lines they have in common.

`comm file1.txt file2.txt`

## diff

More complex comm. Has two formats, -c and -u (context and unified).

Best to use
`diff -u file.txt file2.txt`

## patch

Used to apply changes to a text file.

1. First create a diff file
   `diff -Naur old_file new_file > diff_file`
2. Patch the old file into the new file.
   `patch < diff_file`

```
 diff -Naur file1.txt file2.txt > patchfile.txt
 patch < patchfile.txt
```

# Editing text on the fly

## tr

- Used to transliterate characters. Transliteration is the process of changing characters from one alphabet to another. Example converting characters from lowercase to uppercase.

`echo "lowercase letters" | tr a-z A-Z`

## sed

- Used for filtering and transforming text

`echo "front" | sed 's/front/back/'` - replaces the first occurence of front with back. 's' is a substitution command.

- To match line numbers use the -n flag
  `sed -n '1,5p' distro.txt` - match lines 1-5 on the distro file.p command causes the line to be printed.

- You can also use sed with regex.
  `sed <regex> distro.txt `
- You can replace multiple by chaining like so:
  `sed 's/front/back'; 's/me/you' distro.txt`

Sed command options
Command Description
= Output the current line number.
a Append text after the current line.
d Delete the current line.
i Insert text in front of the current line.
p Print the current line. By default, sed prints every line and
only edits lines that match a specified address within the
file. The default behavior can be overridden by specifying
the -n option.
q Exit sed without processing any more lines. If the -n option
is not specified, output the current line.
Q Exit sed without processing any more lines.
s/regexp/replacement/ Substitute the contents of replacement wherever regexp is
found. replacement may include the special character &,
which is equivalent to the text matched by regexp. In addi-
tion, replacement may include the sequences \1 through \9,
which are the contents of the corresponding subexpressions
in regexp. For more about this, see the following discus-
sion of back references. After the trailing slash following
replacement, an optional flag may be specified to modify
the s command’s behavior.
y/set1/set2 Perform transliteration by converting characters from set1 to
the corresponding characters in set2. Note that unlike tr,
sed requires that both sets be of the same length.

# aspell

- Interactive spell checker
  `aspell check <file>`
