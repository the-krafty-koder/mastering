# Optional and default parameters

You can use ? to mark parameters as optional. Optional parameters come after required parameters.

```
function hello(content: string, userId?: string){
    ...
}
```

Default parameters

```
function hello(content: string, userId='45': string){
    ...
}
```

# Rest parameters

Functions can accept a varied number of arguments instead of a fixed one by using the rest parameter.

```
const sum = (...numbers) => {
    return numbers.reduce((a,b) => a+b)
}
```

# Call, apply and bind

Javascript supports two other ways to call a function in addition to ()

- Apply binds a value to `this` within your function
- Call does same as apply, but in order instead of an array
- Bind does the same, it passes a `this` argument and a list of arguments to your function but it doesn't invoke the said function. It returns a new function that you can then invoke with (), .call, or .apply

```
function add(a: number, b: number): number {
return a + b
}

add(10, 20)
add.apply(null, [10,20])
add.call(null, 10, 20)
add.bind(null, 10, 20)()
```

# This

This variable is defined for every function, not just methods. It has a different value depending on how you called your object.

- General rule is that `this` will take the value of the thing to the left of the dot when invoking a method.

# Generator functions

- They are a convenient way to generate a bunch of values. They only compute values when the consumer asks for it.

```
function* createFibonacciGenerator() {
    let a=0
    let b=1
    while(true){
        yield a
        [a,b] = [b,a+b]
    }
}

const x = createFibonacciGenerator()
x.next() // evaluates to {value: 0, done: false}
x.next() // evaluates to {value: 1, done: false}
```

# Iterators

They are the opposite of generators. While generators are a way to produce a
stream of values, iterators are a way to consume those values.

Read more here -> https://mzl.la/2UitIk4

# Generic type parameters

A placeholder type used to enforce a type level constraint in multiple places. Also called a polymorphic type parameter.

```
type Filter = <T>(array: T[], f: (item: T) => boolean): T[]
let filter: Filter = (array, f) => {...}
```

- The <> brackets are how you declare generic types.Think of them like the type keyword but for generics
- Because we declared T as part of the call signature, Typescript will bind T a concrete type to T when we actually call a function of type Filter.
- if we scoped T to the type alias Filter, Typescript would have required us to bind a type each time we use Filter.

```
type Filter<T> = (array: T[], F:(item: T) => boolean): T[]
let filter: Filter<number> = (array, f) => {...}
```

# Bounded polymorphism

Sometimes we want to say the type "U should be at least T" instead of just "this thing is of some generic type T"

- Suppose we want to write a function mapNode that takes in a treenode, performs a function on its value and returns a treenode

```
type TreeNode = {
value: string
}
type LeafNode = TreeNode & {
isLeaf: true
}
type InnerNode = TreeNode & {
children: [TreeNode] | [TreeNode, TreeNode]
}

let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}
let a1 = mapNode(a, _ => _.toUpperCase()) // TreeNode
let b1 = mapNode(b, _ => _.toUpperCase()) // Leafnode
let c1 = mapNode(c, _ => _.toUpperCase()) // Innernode
```

Mapnode would be defined like so:

```
function mapNode<T extends TreeNode>(
node: T,
f: (value: string) => string
): T {
    return {
        ...node,
        value: f(node.value)
    }
}
```

Here, mapNode is a function that defines a single generic type parameter, T. T has an
upper bound of TreeNode. That is, T can be either a TreeNode, or a subtype of
TreeNode.If we had typed T as just T (leaving off extends TreeNode), then mapNode would have thrown a compile-time error, because you can’t safely read node.value on
an unbounded node of type T (what if a user passes in a number?).

# Bounded polymorphism with constraints

In the last example, we put a single type constraint on T: T has to be at least a
TreeNode. But what if you want multiple type constraints?
Just extend the intersection (&) of those constraints:

```
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}
function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength)
    return s
}
type Square = HasSides & SidesHaveLength
let square: Square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square) // Square, logs "12"
```

# Generic type defaults

```
type MyEvent<T = HTMLElement> = {
    target: T
    type: string
}
```
