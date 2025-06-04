# Set

- Stores unique members of an iterable.
- Do not preserve insertion order.

```
const s = new Set([1,2,3,4,5])
```

# Set methods

```
s.add(7) -> addition
s.has(3) -> existence check
s.keys() - returns an iterator of the sets keys
s.values() - returns same data as keys
s.entries() - returns a key value pair of the set's key/values
```

# Map

- Holds key value pairs where the keys can be of any datatype.
- A map remembers the original insertion order of the keys.
- Create a map by passing an array to the Map object

`const m = new Map(["apple", 500], ["oranges":100])`
