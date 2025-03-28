// // by proxy
// const consoleHandler = () => {
//   get: (target, property) => {
//     const time = Date.now().toLocaleString();
//     const result = target[property];
//     return `${time}:${result}`;
//   };
//   apply:
// };

// const enhancedConsoleTwo = new Proxy(
//   { : () => {} },
//   {
//     apply: (target, thisArg, args) => {
//       const time = Date.now().toLocaleString();
//       console.log(args);
//       return thisArg([time, ...args]);
//     },
//   }
// );
// enhancedConsoleTwo.log("Trial 0");

// using composition
class EnhancedConsole {
  constructor(console) {
    this.console = console;
  }

  getTime() {
    return new Date().toISOString();
  }

  log(value) {
    const time = this.getTime();
    this.console.log(`${time}: ${value}`);
  }

  info(value) {
    const time = this.getTime();
    this.console.log(`${time}: ${value}`);
  }
}

const enhancedConsole = new EnhancedConsole(console);
enhancedConsole.log("Trial");

// using augmentation

const patchedConsole = (passedConsole) => {
  const logOrig = passedConsole.log;
  passedConsole.log = (value) => {
    const time = new Date().toISOString();
    return logOrig(`${time}: ${value}`);
  };
  return passedConsole;
};

const consoleNew = patchedConsole(console);
consoleNew.log("Trial 2");
