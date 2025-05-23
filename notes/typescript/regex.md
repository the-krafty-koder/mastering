# 🔍 Regex Lookahead Summary

Lookahead is a **regex assertion** that checks what comes **after** the current position **without consuming characters**.

---

## ✅ Positive Lookahead: `(?=...)`

Matches if the pattern `...` **follows** the current position.

```javascript
/foo(?=\d)/   // matches "foo" only if followed by a digit
❌ Negative Lookahead: (?!...)
Matches if the pattern ... does NOT follow the current position.

/foo(?!bar)/  // matches "foo" only if NOT followed by "bar"
Common Use Cases
Conditional pattern matching
Filtering results based on what's ahead
Finding overlapping matches
Example: match all overlapping "aa" in "aaa":

```

const str = "aaa";
const regex = /(?=(aa))/g;
const matches = str.matchAll(regex);

for (const match of matches) {
console.log(match[1]); // Output: "aa", "aa"
}

```

```
