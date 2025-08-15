# Recursion

- A recursive function is one that calls itself.
- Every recursive function has 2 parts: the base case and the recursive case.

```
def countdown(i):
    print(i)
    if i <= 1:
        return  (base case - when the recursive function doesn't call itself)
    else:
        countdown(i-1) (recursive case - when it calls itself)
```

# Call stack

- Useful in recursion. For each function call, values of the variables for that function are stored in the call stack.
- Using a stack is convenient but the downside is use of memory. The call stack can grow large and when the program runs out of memory, it exits with a stack overflow error.
