# Creating an array

`days=(Mon Tue Wed Thu Fri Sat)`

# Array operations

## Outputting the entire contents of an array

Subscripts \* and @ can be used to access every element in an array. @ is mostly used. If array contents are strings, use "" on the variable for correct word splitting, eg `for i in "${animals[@]}"; do echo $i; done`

```
> animals=("a cat" "a dog" "a giraffe")
> for i in "${animals[@]}"; do echo $i; done
```

## Determining the number of array elements.

Use `echo ${#a[@]}` to find the number of array elements
Use `echo ${#a[100]}` to find the length of the element at index 100 of the array

# Finding the subscripts used by an array

Arrays can contain gaps in the assignment of subscripts.
`foo=([2]=a [4]=b [6]=c)`
To determine elements which actually exist, use `${!foo[@]}`

# Adding elements to the end of the array

Use the += assignment operator to add values to the end of the array

```
foo=(a b c)
foo+=(d e f)
```

# Sorting an array

- There is no direct way of doing it, but with coding

```
a=(4 3 1 2)
a_sorted=($(for i in "${a[@]}"; do echo $i; done | sort))
```

# Deleting an array

Use the unset command to delete an array.

```
foo=(1 2 3 4)
unset foo
```

You can also use unset to delete an array element. The element must be quoted to prevent the shell from performing pathname expansion.
`unset 'foo[1]`
