import { EventEmitter, once } from "events";

// component that requires initialization before any of its APIS
// is used
class Db extends EventEmitter {
  connected = false;

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit("connected");
    }, 4000);
  }

  async query(queryString) {
    if (!this.connected) {
      throw new Error("Not connected yet");
    }
    console.log(`Query executed: ${queryString}`);
  }
}

const db = new Db();

// How to solve
// 1: Local initialization check

db.connect();

const updateLastAccess = async () => {
  if (!db.connected) {
    await once(db, "connected");
  }

  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`);
};

updateLastAccess;

// Delayed startup

const initialize = async () => {
  db.connect();
  await once(db, "connected");
};

const updateLastAccessNew = async () => {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`);
};

initialize().then((res) => {
  updateLastAccess();
});

// class DB extends EventEmitter {
//   connected = false;
//   commandQueue = [];

//   async query(queryString) {
//     if (!this.connected) {
//       console.log(`Request queued: ${queryString}`);
//       return new Promise((resolve, reject) => {
//         const command = () => {
//           this.query(queryString).then(resolve, reject);
//         };
//         this.commandQueue.push(command);
//       });
//     }

//     console.log(`Query executed: ${queryString}`);
//   }

//   connect() {
//     // simulate the delay of the connection
//     setTimeout(() => {
//       this.connected = true;
//       this.emit("connected");
//       this.commandsQueue.forEach((command) => command()); // (2)
//       this.commandsQueue = [];
//     }, 500);
//   }
// }
