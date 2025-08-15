# BFS

- Allows you to find the shortest distance between 2 things.The algorithm to
  solve a shortest-path problem is called breadth-first search.
- A graph models a set of connections.

# Finding the shortest path

- There are 2 questions BFS can answer for you:

1. Is there a path from nodeA to nodeB?
2. What is the shortest path from nodeA to nodeB?

- We can use queues to implement BFS that satisfies these requirements.

# Implementing the algorithm

1. Use a queue to store neighbors.
2. Pop a person of the queue from the start.
3. Check if that item is the target.
4. If not add all the items members to the queue.

```
class Node {
    constructor(value) {
        this.value = null;
        this.children = []
    }

    addChild (value) {
        this.children.append(new Node(value))
    }
}

const bfs = (target, root) => {
    const queue = [root]

    while(queue.length > 0) {
        const current = queue.unshift()
        if(current.value === target) {
            return current
        }
        for(const child of children) {
            queue.push(child)
        }
    }
}
```
