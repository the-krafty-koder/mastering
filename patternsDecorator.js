// Decorator by composition
// ( wrapping the decorated component with another object with inherited methods)

import { StackCalculator } from "./patternsProxy";

class EnhancedCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  // new method
  add() {
    const addend2 = this.getValue();
    const addend1 = this.getValue();
    const result = addend1 + addend2;
    this.putValue(result);
    return result;
  }

  // modified method
  divide() {
    // additional validation logic
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // if valid delegates to the subject
    return this.calculator.divide();
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

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add()); // 4+3 = 7
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply()); // 7*2 = 14

// Decorator by augmentation
const patchCalculator = (calculator) => {
  // new methid
  calculator.add = () => {
    const addend1 = calculator.getValue();
    const addend2 = calculator.getValue();
    const result = addend1 + addend2;
    calculator.putValue(result);
    return result;
  };

  //modified method
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    // if valid delegates to the subject
    return divideOrig.apply(calculator);
  };

  return calculator;
};

const calculator_two = new StackCalculator();
const enhancedCalculator_two = patchCalculator(calculator);

// Decorating with proxy object
const enhancedCalculatorHandler = {
  get(target, property) {
    if (property === "add") {
      // new method
      return function add() {
        const addend2 = target.getValue();
        const addend1 = target.getValue();
        const result = addend1 + addend2;
        target.putValue(result);
        return result;
      };
    } else if (property === "divide") {
      // modified method
      return function () {
        // additional validation logic
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
  },
};

const calculatorThree = new StackCalculator();
const enhancedCalculatorThree = new Proxy(
  calculator,
  enhancedCalculatorHandler
);
