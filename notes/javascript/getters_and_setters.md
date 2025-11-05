```
export const person = {
	firstName: null,
	lastName: null,
	get fullName() {
		return `${this.firstName} ${this.lastName}`
	},
	set age(age) {
		this._age = age
	},
    get age() {
        return this._age
    }
}

Object.defineProperty(person, 'age', {
	enumerable: false
})

export const defineProperties = (obj) => {
    Object.defineProperty(obj, 'fullName', {
        get () {
            return `${this.firstName} ${this.lastName}`
        }
    })

    Object.defineProperty(obj, 'age', {
        get () {
            return this._age
        },
        set () {
            this._age = age
        },
    })
}
```

- If enumerable is set to true, the property will be iterated over when using a for...in loop on the object.

# Why use getters and setters

- Gives simpler syntax
- Allows equal syntax for properties and methods
- Can secure better data quality
- Useful for doing things behind the scenes.

# Singleton

```
/*
 * Create your Singleton class in this file.
 */

class Singleton {
    static instance = null;

    constructor () {
        if(Singleton.instance) {
            return Singleton.instance
        }
        Singleton.instance = this
    }

    static getInstance() {
        if(!Singleton.instance) {
            Singleton.instance = new Singleton()
        }
        return Singleton.instance
    }

    message() {
        return 'Hello Singleton!'
    }

}

export const s = new Singleton()
export default Singleton
```
