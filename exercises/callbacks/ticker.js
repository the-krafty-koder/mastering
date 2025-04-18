import { EventEmitter } from "events";

const tickerWrapper = (number, cb) => {
  const emit = new EventEmitter();
  let counter = 0;
  emit.on("tick", (time) => {
    counter++;
    if (time % 5 !== 0) {
      emit.emit("error", new Error(time));
      return cb(new Error(time));
    }
  });

  const emitEvent = () => emit.emit("tick", Date.now());

  const interval = setInterval(() => {
    emitEvent();
  }, 50);

  setTimeout(() => {
    clearInterval(interval);
    cb(null, counter);
  }, number);

  return emit;
};

tickerWrapper(160, (err, n) => {
  if (err) {
    return console.log(`Event time error ${err}`);
  }
  console.log(`Event has been emitted ${n} times`);
}).on("error", (err) => console.log(err));
