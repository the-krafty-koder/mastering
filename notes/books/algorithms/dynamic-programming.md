# Dynamic programming

- A technique to solve hard problems by breaking it down to smaller problems and solving those first.
- Dynamic programming only works when each problem is discreet, not when it depends on another problem.

# Dynamic Programming: Knapsack Example

Problem
Knapsack capacity: 4 lbs

Items:

Stereo → value = $3000, weight = 4 lbs

Guitar → value = $1500, weight = 1 lb

Laptop → value = $2000, weight = 3 lbs

Goal: Maximize the total value without exceeding 4 lbs.

Step 1: Define Subproblem
Let dp[i][w] = maximum value using the first i items with capacity w.

Create a 2D table dp[n+1][W+1].
Fill it iteratively:
Rows = items
Columns = capacity from 0 to W

Step 2 : Recurrence relation
For each item and each possible weight capacity of the knapsack, you have two choices:

1. Skip the item
   If the item is too heavy for the current remaining capacity, you can’t take it.
   Or, even if it fits, you may get a better total value by leaving it out.
   In this case, the best value is just whatever was possible with the previous items.

2. Take the item
   If the item fits, you can include it.
   The value then becomes:
   The item’s value
   Plus the best value you could get with the remaining capacity after subtracting this item’s weight.
   Finally, you compare the two options — take it vs skip it — and keep the better one.

Step 3: Build the table
Capacity = 0 → 4
Items in order: Guitar (1 lb, $1500), Laptop (3 lb, $2000), Stereo (4 lb, $3000)

| Item \ Capacity | 0   | 1    | 2    | 3    | 4    |
| --------------- | --- | ---- | ---- | ---- | ---- |
| None            | 0   | 0    | 0    | 0    | 0    |
| Guitar          | 0   | 1500 | 1500 | 1500 | 1500 |
| Laptop          | 0   | 1500 | 1500 | 2000 | 3500 |
| Stereo          | 0   | 1500 | 1500 | 2000 | 3500 |

Step 4: Read Result
Best value = $3500 at capacity 4.
This comes from Laptop (3 lbs, $2000) + Guitar (1 lb, $1500).
Stereo alone is $3000 but worse than the combination.

# General tips for coming up with a dynamic programming solution

- It’s often useful to picture a dynamic programming problem as a grid.
- The values in the cells are usually what you’re trying to optimize. For
  the knapsack problem, the values are the value of the goods.
- Each cell is a subproblem, so think about how you can divide
  your problem into subproblems. That will help you figure out what
  the axes are.
