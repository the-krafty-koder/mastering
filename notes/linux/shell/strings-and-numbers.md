# Parameter expansion

If a variable is close to other text, use curly braces as part of the expansion.

```
> a=foo
> echo "${a}_file"
```

## Expansions to manage empty variables

`${parameter:-<word>}` - if parameter is unset or empty, default becomes word
`${parameter:=word}` - if parameter is unset or empty, default becomes word. Additionally, word is assigned to parameter.
`${parameter:?word}` - if parameter is unset or empty, the expansion causes the script to exit with a standard error, and the contents of word are sent to standard error.
`${parameter:+word}` - if parameter is unset or empty, the expansion results in nothing.

Example

```
[me@linuxbox ~]$ foo=bar
[me@linuxbox ~]$ echo ${foo:+"substitute value if set"}
substitute value if set
```

## Expansions that return varible names

`${!<prefix>*}`
`${!<prefix>@}` - returns the name of existing variables with names beginning with prefix

`echo ${!BASH*}` - example

## String operations

`${#<parameter>}` - returns the length of the string contained by parameter.
`${#*}` - returns the number of positional parameters

Example

```
>foo="My name is Anderson"
>echo "'$foo' is ${#foo} characters long"
>'My name is Anderson' is 19 characters long
```

`${<parameter>:<offset>}` - extract a portion of the string contained in parameter. Extraction begins at the offset. Offset values can be negative to signify end of string
`${<parameter>: <offset>: length}` - extraction begins at offset and ends at offset+length
`${parameter#pattern}`
`${parameter##pattern}` - remove a leading portion of the string contained in parameter defined by pattern. Pattern is a wildcard pattern like those used in pathname expansion. The # form removes the shortest match, while the ## form removes the longest match.

Example

```
root@c33b6226f5d3:/home/ubuntu/bin# foo=file.text.zip
root@c33b6226f5d3:/home/ubuntu/bin# echo "${foo#*.}"
text.zip
```

`${parameter%pattern}`
`${parameter%%pattern}` - same as above, but they remove strings at the end instead of the start

- search and replace on variables. 1st is search, 2nd is replace. / replaces first occurrence, // replaces all occurrences. The /# form requires that the match occur at the beginning of the string, and the /% form requires the match to occur at the end of the string. In every form, /string may be omitted, causing the text matched by pattern to be deleted.

```
${parameter/pattern/string}
${parameter//pattern/string}
${parameter/#pattern/string}
${parameter/%pattern/string}
```

## Case conversion

`declare -u upper`
`declare -l lower` -> force a variable to always contain the desired format no matter what is assigned to it.

Table 34-1: Case Conversion Parameter Expansions
`${parameter,,pattern}` -> Expand the value of parameter into all lowercase. pattern is an optional shell pattern that will limit which characters (for example, [A-F]) will be converted.
`${parameter,pattern}` -> Expand the value of parameter, changing only the first character to lowercase.
`${parameter^^pattern}` -> Expand the value of parameter into all uppercase letters.
`${parameter^pattern}` -> Expand the value of parameter, changing only the first character to uppercase (capitalization).

# Arithmetic Evaluation and Expansion

The basic form is `$((expression))`. The compound command `(())` is used for truth tests.
The results of division are always whole numbers `((5/2)) = 2`

## The ternary operator

Works only on arithmetic operations, not strings

```
a=0
(($foo>0?++a:--a))     // ternary operator
echo $a
> 1
```

Performing assingment inside a ternary operator is not straightforward: use it like so

`((a<1?(a+=1):(a-=1)))`

# Bc

Used to perform complex operations. View its man page for details
