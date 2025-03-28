// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.

export default class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(listener);
      return this;
    }

    this.listeners[eventName] = [listener];
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    this.listeners[eventName]?.pop(listener);
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    try {
      const listeners = this.listeners[eventName];
      for (const listener of listeners) {
        listener(...args);
      }
    } catch (IndexError) {
      throw "Event name is non-existent";
    }
  }
}

// const emitter = new EventEmitter();
// let a = 0,
//   b = 1;
// emitter.on("foo", () => {
//   a = 1;
// });
// emitter.on("foo", () => {
//   b = 3;
// });
// emitter.emit("foo");
// console.log(a, b);

class Set {
  constructor(items) {
    this.items = items;
  }

  add(value) {
    if (!this.items.includes(value)) {
      this.items.push(value);
    }
  }

  pop() {
    return this.items.pop();
  }

  delete(value) {
    const index = this.items.indexOf(value);
    this.items.splice(index, 1);
  }

  clear() {
    this.items = [];
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[-1];
  }
}

const binarySearch = (arr, start, end, searchItem) => {
  let mid = low + Math.floor((high - low) / 2);
  if (arr[mid] === x) {
    return mid;
  }

  if (arr[mid] > x) {
    return binarySearch(arr, low, mid - 1, x);
  }

  return binarySearch(arr, mid + 1, high, x);
};

// BFS

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(value) {
    this.children.push(new Node(value));
    return this;
  }
}

const breadthFirstSearch = (root) => {
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === null) continue;

    result.push(current.value);
    for (const child of current.children) {
      queue.push(child);
    }
  }

  return result;
};

//DFS
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const depthFirstSearchTree = (node) => {
  if (!node) return;

  // custom functionality here

  depthFirstSearchTree(node.left);
  depthFirstSearchTree(node.right);
};

const root = new TreeNode("A");
root.left = new TreeNode("B");
root.right = new TreeNode("C");
root.left.left = new TreeNode("D");
root.left.right = new TreeNode("E");
root.right.right = new TreeNode("F");

console.log("DFS Traversal of Tree:");
depthFirstSearchTree(root);

// DFS Traversal of graph
const depthFirstGraph = (graph, node, visited = new Set()) => {
  if (visited.has(node)) return;

  // process the functionality here

  visited.add(node);
  for (const neighbor of graph[node]) {
    depthFirstGraph(graph, neighbor, visited);
  }
};

const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: [],
  F: [],
};

console.log("DFS Traversal of Graph (Iterative with Stack):");
depthFirstGraph(graph, "A");
