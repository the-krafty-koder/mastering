const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

const createAlphabetIterator = () => {
  let currCode = A_CHAR_CODE;

  return {
    next: () => {
      const currChar = String.fromCharCode(currCode);
      if (currCode > Z_CHAR_CODE) {
        return { done: true };
      }

      currCode++;

      return { done: false, value: currChar };
    },
  };
};

const iterator = createAlphabetIterator();
let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}

// implementing an iterabele via adding an  iterator

export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  get(row, col) {
    if (row > this.data.length || col > this.data[row].length) {
      throw new RangeError("Out of range");
    }
    return this.data[row][column];
  }

  set(row, col, value) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError("Out of bounds");
    }
    this.data[row][column] = value;
  }

  [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;

    return {
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true };
        }

        const currVal = this.data[nextRow][nextCol];
        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }
        return { value: currVal };
      },
    };
  }
}

const matrix2x2 = new Matrix([
  ["11", "12"],
  ["21", "22"],
]);

const iteratorNew = matrix2x2[Symbol.iterator]();
let iterationResultNew = iteratorNew.next();
while (!iterationResultNew.done) {
  console.log(iterationResultNew.value);
  iterationResultNew = iterator.next();
}
