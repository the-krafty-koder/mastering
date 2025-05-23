# Assigning variables

`title='System Report`
Rules:
• Variable names may consist of alphanumeric characters (letters and
numbers) and underscore characters.
• The first character of a variable name must be either a letter or an
underscore.
• Spaces and punctuation symbols are not allowed.

- Use uppercase letters to denote constants( values that dont change) and lowercase letters to denote variables ( that change)
- The value can be anything that can be expanded into a string.

# Here documents

It is an I/O redirection in which we embody text into our script and feed into the standard input of a command.

`cat << token
text
token
`

```
cat << _EOF_
<html>
<head>
<title>$TITLE</title>
</head>
<body>
<h1>$TITLE</h1>
<p>$TIMESTAMP</p>
</body>
</html>
_EOF_
```

Quotation marks are not paid attention to in here documents.
