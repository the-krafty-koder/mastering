export class StackCalculator {
  constructor() {
    this.stack = [];
  }
  putValue(value) {
    this.stack.push(value);
  }
  getValue() {
    return this.stack.pop();
  }
  peekValue() {
    return this.stack[this.stack.length - 1];
  }
  clear() {
    this.stack = [];
  }
  divide() {
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }
  multiply() {
    const multiplicand = this.getValue();
    const multiplier = this.getValue();
    const result = multiplier * multiplicand;
    this.putValue(result);
    return result;
  }
}

const calculator = new StackCalculator();
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply()); // 3*2 = 6 calculator.putValue(2) console.log(calculator.multiply())

// safe calculator via proxy using object composition

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  divide() {
    const divisor = this.calculator.peekValue();
    // additional validation logic
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // delegated method
    return this.calculator.divide;
  }

  // delegated methods
  putValue(value) {
    return this.calculator.putValue(value);
  }
  getValue() {
    return this.calculator.getValue();
  }
  peekValue() {
    return this.calculator.peekValue();
  }
  clear() {
    return this.calculator.clear();
  }
  multiply() {
    return this.calculator.multiply();
  }
}

safeCalculator.putValue(2);
console.log(safeCalculator.multiply()); // 6*2 = 12
calculator.putValue(0);
console.log(calculator.divide()); // 12/0 = Infinity
safeCalculator.clear();
safeCalculator.putValue(4);
safeCalculator.putValue(0);
console.log(safeCalculator.divide()); // 4/0 -> Error

// safe calculator via proxy using object augmentation

function patchToSafeCalculator(calculator) {
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    // additional validation logic
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // if valid delegates to the subject
    return divideOrig.apply(calculator);
  };
  return calculator;
}
const calculatorNew = new StackCalculator();
const safeCalculator = patchToSafeCalculator(calculatorNew);

// Built in proxy object
/*
The ES2015 specification introduced a native way to create powerful 
proxy objects. The ES2015 Proxy object, which consists of a Proxy 
constructor that accepts a target and a handler as arguments: 
const proxy = new Proxy(target, handler)

Target represents the object on which the proxy is applied (the subject),
while handler is a special object that defines the behavior of the proxy.

The handler object contains a series of optional methods with predefined 
names called trap methods (for example, apply, get, set, and has) that are 
automatically called when the corresponding operations are performed on 
the proxy instance.
*/

const safeCalculatorHandler = () => {
  get: (target, property) => {
    if (property === "divide") {
      return () => {
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error("Division by 0");
        }
        // if valid delegates to the subject
        return target.divide();
      };
    }
    // delegated methods and properties
    return target[property];
  };
};

const calculator_another = new StackCalculator();
const safeCalculator_new = new Proxy(calculator_another, safeCalculatorHandler);

// Change observer with proxy
/*
The Change Observer pattern is a design pattern in which an object 
(the subject) notifies one or more observers of any state changes, 
so that they can "react" to changes as soon as they happen.
*/

export function createObservable(target, observer) {
  const observable = new Proxy(target, {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, curr: value });
      }
      return true;
    },
  });
  return observable;
}

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}
const invoice = { subtotal: 100, discount: 10, tax: 20 };
let total = calculateTotal(invoice);
console.log(`Starting total: ${total}`);
const obsInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  total = calculateTotal(invoice);
  // (2)
  console.log(`TOTAL: ${total} (${prop} changed: ${prev} ->
  ${curr})`);
});
obsInvoice.subtotal = 200; // TOTAL: 210
obsInvoice.discount = 20; // TOTAL: 200
obsInvoice.discount = 20; // no change: doesn't notify
obsInvoice.tax = 30; // TOTAL: 210
console.log(`Final total: ${total}`);
