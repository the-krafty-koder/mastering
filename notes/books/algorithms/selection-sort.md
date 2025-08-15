# Arrays vs Linked Lists

Arrays have random access, so faster for reading than linked lists.

# Time complexity

                    Arrays      Linked List
    Reading         O(1)        O(n)
    Insertion       O(n)        O(1)
    Deletion        O(n)        O(1)

# Selection sort

- Involves repeatedly finding the smallest(or largest) element in the unsorted part of an array and then placing it at the beginning of the sorted part. It takes O(n^2) time.

# Implementation

```
const findSmallest = (arr) => {
    let smallest = arr[0]
    let smallestInd = 0

    for(let i=1;i<arr.length;i++) {
        if(arr[i] < smallest) {
            smallest = arr[i]
            smallestInd = i
        }
    }

    return smallestInd
}

const selectionSort = (arr) => {
    const sorted = []
    const copied = [...arr]

    for(let n=0;n<copied.length;n++) {
        const sm = findSmallest(copied)
        copied.splice(i,0)
        sorted.push(sm)
    }

    return sorted
}
```
