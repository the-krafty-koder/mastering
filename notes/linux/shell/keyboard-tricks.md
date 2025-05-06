# Command line editing

Bash uses a library called readline to implement command line editing

## Cursor movement commands

Cntrl A - move to start of line
"" E - move to end of line
"" F - same as right arrow key
"" B - same as left arrow key
ALT F - move forward one word
"" B - move backward one word
CTRL L - clear screen

## Modifying text

ctrl-D Delete the character at the cursor location.
ctrl-T Transpose (exchange) the character at the cursor location with the one
preceding it.
alt-T Transpose the word at the cursor location with the one preceding it.
alt-L Convert the characters from the cursor location to the end of the word
to lowercase.
alt-U Convert the characters from the cursor location to the end of the word
to uppercase.

# Completion

Use the tab key for completion. Double tab to list all possible completions

# Working with history

use `history` to search through history list.

`history | less `

Once you get the line number , use `!<line-number>` to invoke the command

Use CTRL+R to run incremental search. Once the result is displayed, run it using enter or CTRL+J

ctrl-P - Move to the previous history entry. This is the same action as the up arrow.
ctrl-N - Move to the next history entry. This is the same action as the down arrow.
alt-< - Move to the beginning (top) of the history list.
alt-> - Move to the end (bottom) of the history list, i.e., the current command line.
ctrl-R - Reverse incremental search. This searches incrementally from the current com-
mand line up the history list.
alt-P - Reverse search, nonincremental. With this key, type in the search string and
press enter before the search is performed.
alt-N - Forward search, nonincremental.
ctrl-O - Execute the current item in the history list and advance to the next one. This
is handy if you
