# Binary Search

- Works on sorted lists.
- Cuts search space in half each step → O(log n) time.
- Example: 1B items → max 30 steps; Simple search O(n) → 1B steps.
- Needs logarithms: log₂n = number of halving steps.

# Implementation

```
var search = function(nums, target) {
    let l = 0
    let r = nums.length-1

    while(l<=r) {
        const mid = Math.floor((r+l) / 2)
        if(nums[mid] === target) {
            return mid
        } else if (nums[mid] > target) r = mid-1
        else if (nums[mid] < target) l = mid + 1
    }

    return -1
};
```

- Quicksort time complexity is O(nlogn) on average case because Because each level costs O(n) and there are about logn levels (due to halving), the total average work is:
  O(n)×O(logn)=O(nlogn)

- The worst case scenario for quicksort is when you choose the first element as the pivot and the rest are already sorted.Time complexity will be O(n) for each level and the levels will be O(n) so in total the algorithm will take O(n) \*
  O(n) = O(n2) time.
- If you always choose a random element in the array as the pivot, quicksort will complete in O(n log n) time on average.
