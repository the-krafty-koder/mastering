# Exiting

Use `:q` to exit

# Common commands

Use `i` to enter insert mode, use ESC key to return to command mode.
Use `:w` to save edited content

Common key moves
k or up - arrow Up one line.
0 (zero) - To the beginning of the current line.
^ - To the first non-whitespace character on the current line.
$ - To the end of the current line.
w - To the beginning of the next word or punctuation character.
W - To the beginning of the next word, ignoring punctuation
characters.
b - To the beginning of the previous word or punctuation
character.
B - To the beginning of the previous word, ignoring punctuation
characters.
ctrl-F - or page down Down one page.
ctrl-B - or page up Up one page.
numberG - To line number. For example, 1G moves to the first line of
the file.
G - To the last line of the file.

# Editing

- Use `0` to move to start of current line
- Use `$` to move the cursor to the end of the current line.
- Use `a`command to go to end of line and append text
- Use `O` command to open a new line above the current lines
- Use `o` command to open a new line above the current lines
- Use `dd` to delete a line
- Use `x` to delete a character
- Use `yy` to copy the current line
- Use `p` to paste
- Use `G` to move the cursor to the last line
- Use `J` to join one line to another.

# Search and replace

Use the `/` with a search value to launch a search
Use `:%s/Line/line/g` to perform search and replace operations

: - The colon character starts an ex command.
% - This specifies the range of lines for the operation. % is a shortcut mean-
ing from the first line to the last line.
s - This specifies the operation. In this case, it’s substitution
(search-and-replace).
/Line/line/ - This specifies the search pattern and the replacement text.
g - This means “global” in the sense that the search-and-replace is per-
formed on every instance of the search string in the line.
c - optionaly add toward the end if you want a confirmation on every change

# Editing multiple files

- Use `:bn` to switch from one file to the next
- Use `:bp` to move back to previous file
- To force vi to switch files and abandon your changes, add an exclamation
  point (!) to the above commands.
- Use `:buffers` to display list of files being edited
- To switch to another buffer (file), type :buffer followed by the number
  of the buffer you want to edit
- Use `:e` followed by a filename to open an additional file
- Use `:r` followed by a filename to copy it entirely into another file.
