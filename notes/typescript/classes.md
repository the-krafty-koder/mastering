# Classes and inheritance

- The `private` access modifier automatically assigns the parameter to this, and sets visibility to private(only instances of the class can access, subclasses cannot)
- The `protected` modifier assigns a parameter to this, and also makes the parameter available to only instances of the class anf any instance of the subclass
- The `public` access modifier is the default and it means it can be accessible from anywhere.
- The readonly modifier makes sure that once a parameter is assigned, it can only be read and not written to.
- The `abstract` is used when we dont want users to instantiate a class directly, but rather extend it and instantiate an extension of the class. Placing `abstract` before a method means subclasses have to implement that method.
- Use `super` when a child class overrides a parent class. There are 2 kinds, `super.<parent_method>` for method calls and `super()` called from a child's constructor function.
- When extending a class, you can use `this` as a return type

```
class Game {}
abstract class Piece {
    protected position: Position
    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank
    )

    moveto(position: Position) {
        this.position = position
    }

    abstract canMoveTo(position: Position): boolean
}
class Position {
    constructor(
        private file: File
        private rank: Rank
    ){}
}

class King extends Piece
class Queen extends Piece
class Bishop extends Piece
```

# Interfaces

A way to name a type so you dont define it inline.

Types va Interfaces

1. Types are more general. Their right hand side can be any type including a type expression . For an interface, their righthand side must be a shape. There is no way to write the following as an interface.
   ```
   type A = number
   type B = A | string
   ```
2. When extending an interface, typescript will make sure the interface you're extending is assignable to your expression, not so for intersection types.
3. Multiple interfaces with the same name in the same scope are automatically merged, multiple type aliases in the same scope with same name are not merged.

# Implementations

When declaring a class, you can use the `implements` keyword to say that it satisfies a particular interface.

```
interface Animal {
    eat(food: string): void
    sleep(hours: number): void
}
class Cat implements Animal {
    eat(food:string) {
        ...
    }

    sleep(hours: number) {
        ...
    }
}
```

- Here Cat has to implement every method Animal declares, and can add more on top of it. Interfaces can declare instance properties, but they cant declare visibility modifiers and they cant use the static keyword. You can mark instance properties as readonly though.
- You can implement multiple interfaces and implement them like so:
  `class Cat implements Animal, Feline {...}`

# Interfaces vs Extending Abstract Classes

Difference is that interfaces are more general while abstract classes are more special purpose and feature rich.

# Nominal typing vs Structural typing vs Duck typing

1. Nominal
   Type compatibility is based on explicit declarations and type names. Eg even if 2 classes have the same structure , they are not compatible unless one explicitly extends or implements the other. Used in Java, C#, Swift.

2. Structural
   Type compatibility is based on structure, not the name. If it looks like the type, it is accepted. Used in Typescript, Go

3. Duck typing
   A form of structural typing done at runtime. If it walks and talks like a duck, it is a duck. Used in Python, Javascript

# Dynamic vs Static typing

Dynamic - types are checked at runtime (Python, Javascript)
Static - types are checked at compile time. (Java, C++)

# Weak vs Strong typing

Strong - does not allow implicit type conversion ( Python, Java )
Weak - automatically converts between types when needed. ( Javascript, )

# Polymorphism in classes

```
class MyMap<K, V> {
    constructor(initialKey: K, initialValue: V) {
    // ...
    }
    get(key: K): V {
    // ...
    }
    set(key: K, value: V): void {
    // ...
    }
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
    // ...
    }
    static of<K, V>(k: K, v: V): MyMap<K, V> {
    // ...
}
}
```

- Bind class-scoped generic types when you declare your class. Here, K and V are
  available to every instance method and instance property on MyMap. Note that you cannot declare generic types in a constructor. Instead, move the declaration up to your class declaration.
- Instance methods have access to class-level generics, and can also declare their
  own generics on top. .merge makes use of the K and V class-level generics, and
  also declares two of its own generics, K1 and V1.
- Static methods do not have access to their class’s generics, just like at the value
  level they don’t have access to their class’s instance variables. of does not have
  access to the K and V declared in ; instead, it declares its own K and V generics.

# Mixins

They are ways to implement multiple inheritance
