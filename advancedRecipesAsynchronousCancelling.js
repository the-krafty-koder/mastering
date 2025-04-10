import { asyncRoutine } from "./asyncRoutine.js";
import { CancelError } from "./cancelError.js";

const cancelable = async (cancelObj) => {
  const res = await asyncRoutine("A");
  console.log(res);
  if (cancelObj.cancelRequested) {
    throw new CancelError();
  }

  const resB = await asyncRoutine("B");
  console.log(resB);
  if (cancelObj.cancelRequested) {
    throw new CancelError();
  }

  const resC = await asyncRoutine("C");
  console.log(resC);
};

const cancelObject = { cancelRequested: false };
/*
cancelable(cancelObject).catch((e) => {
  if (e instanceof CancelError) {
    console.log("Function cancelled");
  } else {
    console.error(e);
  }
});
*/

setTimeout(() => (cancelObject.cancelRequested = true), 100);

// wrapping the cancellation
const createCancelWrapper = () => {
  let cancelRequested = false;

  const cancel = () => {
    cancelRequested = true;
  };

  const cancelWrapper = (func, ...args) => {
    if (cancelRequested) {
      return Promise.reject(new CancelError());
    }

    return func(...args);
  };

  return { cancelWrapper, cancel };
};

const cancelableTwo = async (cancelWrapper) => {
  const resA = await cancelWrapper(asyncRoutine, "A");
  console.log(resA);

  const resB = await cancelWrapper(asyncRoutine, "B");
  console.log(resB);

  const resC = await cancelWrapper(asyncRoutine, "C");
  console.log(resC);
};

/*
const { cancel, cancelWrapper } = createCancelWrapper();

cancelableTwo(cancelWrapper).catch((err) => {
  if (err instanceof CancelError) {
    console.log("Function canceled");
  } else {
    console.error(err);
  }
});

setTimeout(() => {
  cancel();
}, 100);
*/
// using a generator function

const createAsyncCancelable = (generatorFunction) => {
  return function asyncCancelable(...args) {
    const generatorObject = generatorFunction(...args);
    let cancelRequested = false;

    const cancel = () => (cancelRequested = true);

    const promise = new Promise((resolve, reject) => {
      async function nextStep(prevResult) {
        if (cancelRequested) {
          return reject(new CancelError());
        }

        if (prevResult.done) {
          resolve(prevResult.value);
        }

        try {
          nextStep(generatorObject.next(await prevResult.value));
        } catch (err) {
          try {
            nextStep(generatorObject.throw(err));
          } catch (err2) {
            reject(err2);
          }
        }
      }
      nextStep({});
    });

    return { promise, cancel };
  };
};

const cancelableThree = createAsyncCancelable(function* () {
  const resA = yield asyncRoutine("A");
  console.log(resA);
  const resB = yield asyncRoutine("B");
  console.log(resB);
  const resC = yield asyncRoutine("C");
  console.log(resC);
});

const { promise, cancel } = cancelableThree();
promise.catch((err) => {
  if (err instanceof CancelError) {
    console.log("Function canceled");
  } else {
    console.error(err);
  }
});
setTimeout(() => {
  cancel();
}, 100);
