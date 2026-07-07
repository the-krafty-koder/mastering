# innerHTML vs innerText vs textContent

1. innerHTML -> returns HTML content
2. innerText -> returns visible text only, not that which is hidden.
3. textContent -> returns text content, both visible and hidden.

# Lexical scoping

- Determines the accessibility of functions and variables based on where they are defined in the source code.
- There are different scope levels
  1. Global -> variables defined outside any function block, accessible anywhere
  2. Local scope -> defined inside a function or block, only accessible within that block.
  3. Nested scope -> inner functions have access to variables in parent functions.
  4. Block scope -> variables defined with let and const limited to the block they are defined in.

# Circular buffers

A circular buffer is a fixed-size data structure that treats memory as circular, connecting the end back to the beginning. Implemented as a circular linked list.

Basic Operations:
Write (enqueue) – Insert data at tail; move tail forward; wrap if necessary.
Read (dequeue) – Read data at head; move head forward; wrap if necessary.
Check empty – head === tail.
Check full – (tail + 1) % size === head.

# Hash collission handling

Hash functions create hash values which are used to create indices for keys in a hash table. Hash function may return same hash value for 2 or more keys, causing a collission.

    Methods to handle a collission

    1. Seperate chaining
    Each cell of the hash table points to a linked list of records that have the same hash function value. Disadvantage is it is simple but requires additional memory space.

    2. Open addressing
    If an index already contains a value, the next available index is calculated ((key+1) % size) then value is stored there. If in case the index that we get is already occupied, then we check for the next index.

# Bloom filter

A probabilistic data structure used to test whether a member is an element of a set.

    How It Works
    Initialization

        Create a bit array of length m, initialized with all bits set to 0.
        Choose k independent hash functions, each mapping an input to a position in [0, m).

    Adding an element (e.g., “cat”)

        Pass "cat" through all k hash functions.
        Each hash function returns an index in the bit array.
        Set the bits at those indices to 1.

    Checking membership (e.g., “cat”)

        Hash “cat” with the same k functions.
        If all corresponding bits are 1, then:
            The element is possibly in the set.

        If any bit is 0, then:
            The element is definitely not in the set.
