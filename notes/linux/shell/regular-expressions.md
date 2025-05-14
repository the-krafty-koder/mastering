# Grep

Searches text files for text matching a regular expression.

```
grep <options> regex <file>
```

-i --ignore-case Ignore case. Do not distinguish between uppercase
and lowercase characters.
-v --invert-match Invert match. Normally, grep prints lines that contain
a match. This option causes grep to print every line
that does not contain a match.
-c --count Print the number of matches (or non-matches if
the -v option is also specified) instead of the lines
themselves.
-l --files-with-matches Print the name of each file that contains a match
instead of the lines themselves.
-L --files-without-match Like the -l option, but print only the names of files
that do not contain matches.
-n --line-number Prefix each matching line with the number of the line
within the file.
-h --no-filename For multifile searches, suppress the output of filename

# Metacharacters

^ $ . [ ] { } - ? \* + ( ) | \

Used to perfom more complex regex operations. When we pass regular
expressions containing metacharacters on the command line, it is vital that they be
enclosed in quotes to prevent the shell from attempting to expand them.

## The any character (.)

It is used to match any character
` grep -h '.zip' dirlist*.txt`

## Anchors (^ and $)

They cause the match to occur only if the characters are found at the beginning (^) or end of the file ($).

`grep -h '^zip' dirlist*.txt`

## Bracket expressions

Allows to specify a set of characters that can be matched. Metacharacters lose their special meaning when placed within brackets, except the caret (^), which is used to indicate negation; the second is the dash (-), which is used to indicate a character range.

`grep -h [bg]zip dirlist*.txt` - used to match either bzip or gzip
`grep -h [^bg]zip dirlist*.txt` - matches any character that doesnt include bzip or gzip
`grep -h [^A-Z] dirlist\*.txt` - matches any file beginning with an uppercase letter

- POSIX also splits regular expression implementations into two kinds:
  Basic regular expressions (BRE) - match the metacharacters `^ $ . [ ] *`
  Extended regular expressions (ERE). - include BRE + `( ) { } ? + |`

- Grep uses the flag -E to match ERE

# Alternation

Allows a match to occur from among a set of expressions.

`echo "AAA" | grep -E 'AAA|BBB|CCC'` - match either AAA, BBB, CCC

# Quantifiers

Used to specify the number of times an element is matched.

1. `?`
   Match an element 0 or 1 times i.e make the element optional
2. `*`
   Match an element zero or more times i.e make it optional but it can occur more than 1 times
3. `+`
   Match an element one or more times
4. `{}`
   Match an element a specific number of times

Specifying the Number of Matches
Specifier Meaning
{n} -> Match the preceding element if it occurs exactly n times.
{n,m} -> Match the preceding element if it occurs at least n times but no more than
m times.
{n,} -> Match the preceding element if it occurs n or more times.
{,m} -> Match the preceding element if it occurs no more than m times
