# Hash functions

- A function where you put in a string and get back a number.
- A hash function consistently maps a name to the same index.
- A hash table is effectively a hash function and an array. The hash function receives a string, returns a number which is used as an array index.
- Hash tables are great when you need to :

1. Create a mapping from one item to another.
2. Look something up.

- You can also use hash tables to prevent duplicate entries and as a cache.
- A hash collission occurrs when 2 keys are assigned the same slot. The easiest solution would be to start a linked list at that slot, and attach both keys. You then have to search through the linked list to find keys & values.Performance will be impacted though if the linked list is long.
- In the average case, hash table takes constant time O(1) for everything. But in the worst case it takes O(n) time.
- To avoid hash collissions, you need:

1. A low load factor.
2. A good hash function

Load factor

- This is the number of occuppied slots in the array / the total number of array slots a hash table uses for storage.
- Having a load factor > 1 means you have more items than slots in your array. Once the load factor starts growing, you need to resize the hash table (twice the size of the original) by creating a bigger array then reinsert all items into the new hash table using the hash function.

Hash function

-
