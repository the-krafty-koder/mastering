# Subtype

If B is a subtype of A, then you can use B anywhere A is required.
A :< B

# Supertype

If A is a supertype of B, then you can use A anywhere B is required.
A :> B

# Variance

- Typescript's behavior is as follows, if you expect a shape, you can pass a type with property types that are < their expected types, but not a supertype of their expected types.
- For an object A to be assignable to an object B, each of its properties
  must be <: its corresponding property in B.

Different types of variance

1. Invariance - you want exactly a T
2. Covariance - you want a <: T
3. Contravariance - you want a :> T
4. Bivariance - youre ok with a <: T or :> T

- In TypeScript, every complex type is covariant in its members—objects, classes,
  arrays, and function return types—with one exception: function parameter types,
  which are contravariant.

Function variance

- Functions are covariant in their return types, which is a fancy way of say‐
  ing that for a function to be a subtype of another function, its return type has to be <: the other function’s return type.
- Functions are contravariant in their parameter and this types. That is, for a function to be a subtype of another function, each of its parameters and its this type must be >: its corresponding parameter in the other function.

- If you want to enforce this variant nature in projects, make sure to use `{strict:true}` in tsConfig.json

# Assignability

- For non-enum types, TS checks assignability by

1. A <: B
2. A is any

- For non-enum types, A is assignable to B if

1. A is a member of enum B
2. B has at least 1 member thats a number and A is a number.

# Type widening

- When you declare a variable in a way that allows it to be mutable eg using `let`, its type is widened to the base type of that literal.

  `let x = 'y' // string`

- But for const
  `const x = 'y' // 'y'`
- Variables initialized to null or undefined are widened to any
  `let x=null // any`
  `x = 3    // any`
  `x = 'M' // any`
- To opt out of type widening, use the const type, It also marks objects as readonly
  `let x={a:3}` // {a: number}
  `let x={a:3} as const` // {readonly a:3}

# Advance object types

For complex types, if you want to access a nested type, you can key into it.

Eg

```
type APIResponse = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
            firstName: string
            lastName: string
            }[]
        }
    }
}

type FriendList = APIResponse['user']['friendList']
```

- keyof operator
  Use keyof to get all of an objects keys as union of string literal types

`type userKeys = keyof APIResponse['user']` // 'userId' | 'friendList'

- Record type

A way to describe an object as a mapping from something to something.

```
type Weekday = 'Mon' | 'Tue'| 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'
let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue'
}
```

- Mapped types
  A better way to type the above code
  `      let nextDay: {[K in Weekday]: Day} = {
    Mon: 'Tue'
}`

Built in mapped types

1. `Record<Keys, Values>`
2. `Partial<Object>` - makes every field in object optional.
3. `Required<Object>` - makes every field in object non-optional.
4. `Readonly<Object>` - makes every field in object readonly
5. `Pick<Object, Keys>` - returns a subtype of object with the given keys.

# Conditional Types

They let you express logic within the type system, like “if this type is assignable to that type, then use X, otherwise use Y.”

```
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>;  // "Yes"
type B = IsString<number>;  // "No"
```

# Mapped types

- Lets you create a new type by taking an existing types keys and applying some transformation to their values or modifiers.

```
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type User = { name: string; age: number };
type OptionalUser = MyPartial<User>;
// { name?: string; age?: number }

```
