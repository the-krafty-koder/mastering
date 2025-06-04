# For loop (Traditional form)

```
for var [in <words>]; do
    commands
done
```

Example

```
#!/bin/bash
# longest-word: find longest string in a file
while [[ -n "$1" ]]; do
    if [[ -r "$1" ]]; then
        max_word=
        max_len=0
        for i in $(strings "$1"); do
            len="$(echo -n "$i" | wc -c)"
        if (( len > max_len )); then
            max_len="$len"
            max_word="$i"
        fi
    done
    echo "$1: '$max_word' ($max_len characters)"
    fi
    shift
done
```

# For loop : C Language form

```
for (expression 1; expression 2; expression3); do
    commands
done
```

Example

```
#!/bin/bash
# simple_counter: demo of C style for command
for (( i=0; i<5; i=i+1 )); do
    echo $i
done
```
