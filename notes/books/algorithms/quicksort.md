# Divide and conquer

- They are recursive algorithms.
- Involve 2 steps:
  1. Figuring out the base case.
  2. Divide or decrease your problem until it becomes the base case.

# Quicksort

- A divide and conquer algorithm. Faster than selection sort.
- The base case is an array with no elements or 1 element.
- If 2 elements just compare and swap.

How it works

1. Pick an element from the array as a pivot.
2. Partition the array into elements smaller than the pivot and larger than the pivot. (2 arrays)
3. Call quicksort recursively on the 2 arrays.

Implementation

```
const quicksort = (arr) => {
    if(arr.length < 2) {
        return arr
    }
    else {
        const pivot = arr[0]
        const less = arr.slice(1).filter(i => i<pivot)
        const greater = arr.slice(1).filter(i => i>pivot)

        return quicksort(less).concat([pivot]).concat(quicksort(greater))
    }
}
```

- The speed of quicksort depends on the pivot you choose.
