# Binary Search Trees

- Used when we want the fast search of a sorted array ( O(logn)) with fast insertions of a linked list (O(1)).
- In a BST, the left node is always smaller than root, while right node is larger than root.
- Shorter tress are faster to search, the shortest a BST can be is O(logn)
- If we can guarantee the height of our tree will be O(log n), then searching
  the tree will be O(log n)

# AVL Trees

- They are a kind of self balancing binary search trees. Whenever the tree is out of balance i.e height is not 0(logn), it will rebalance itself.
- AVL Trees use rotation to balance. If all the nodes are in one line eg 10->20->30 etc, then there is need to rotate to balance.
- The AVL tree knows it is time to balance by storing pieces of information on each node (height or a balance factor). The balance factor can be -1, 0 or 1. The balance factor tells you which child is taller and by how much. Zero means the tree is balanced, -1 means left child is taller and 1 means right child is taller. -1 or 1 is ok but if it goes beyond -1 or 1 then there is need to rebalance.
- After an insert, you travel up a node's ancestors and recalculate the balance factor or the height. Whenever balance factor goes beyond -1 or 1, you need to rebalance. Once rabalanced, move up the tree and check if balance factor needs a recalculation.
