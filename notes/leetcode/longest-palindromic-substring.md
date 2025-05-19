# Find the longest palindromic substring in a string

Start from the midpoint and move outwards. Use 2 pointers, left and right to move outwards respectively.

# Steps

For odd length

1. Assign result to empty and length of result to 0
2. Loop through the index of the strings
3. For every index assign left and right pointers to the index
4. While left and right pointers are within string bounds and s[l] = s[r]:
5. If (r-l+1) > resultLength, reassign both resLength and res
6. Decrement l and increment r

For even length
Assign r to index +1 instead of index only.
