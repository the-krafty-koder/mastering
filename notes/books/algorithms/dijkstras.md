# Dijkstras algorithm

- It is a fastest path algorithm
- BFS is used to find the shortest path but when the edges are weighted i.e have a time factor then Dijkstra's can be used to find the fastest time it takes from start to end node.
- To calculate the shortest path in an unweighted graph, use BFS. To calculate shortest path in a weighted graph, use Dijkstras algorithm.
- Dijkstras algoeithm only works on graphs with no cycles, where all the edges are non-negative.
- For a graph with negative weight edges, use the Bellman Ford algorithm.

Steps

1. Find the 'cheapest' node i.e the node you get to in the least amount of time.
2. Update the costs of the out-neighbors of this node.
3. Repeat until youve done this for every node in the graph.
4. Calculate the final path.

# Implementation

To code dijkstras, you need 3 hash tables

1. Hash table to implement the graph, with each node, its outneighbors and the cost to get there.

   const graph = { "start": {"a": 5, "b":6}, "a":{"fin": 1}, "b": {"a":3, "fin":5}, "fin": null}

2. Hash table to store current costs of each node.

   const costs = {"a": 6, "b": 2, "fin": Infinity}

3. You need a hash table for the parents.
   const parents = {"a": "start", "b": "start", "fin": null}
4. You also need a set to track all the nodes you've visited.

# Code

```

const findLowestCostNode = (costs) => {
    let lowestCost = Infinity
    let lowestCostNode = null
    for(const node in costs) {
        const cost = costs[node]
        if((cost < lowestCost) && !processed.has(node)) {
            lowestCost = cost
            lowestCostNode = node
        }
    }

    return lowestCostNode
}
const node = findLowestCostNode(costs)

while(node) {
    const cost = costs[node]
    const neighbors = graph[node]
    for(const neighbor of Object.keys(neighbors)) {
        const new_cost = cost + neighbors[neighbor]
        if(costs[neighbor] > new_cost) {
            costs[n] = new_cost
            parents[n] = node
        }
    }
    processed.add(node)
    node = findLowestCost(node)
}
```
