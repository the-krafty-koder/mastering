import superagent from superagent;

// Task pattern
const createTask = (target, ...args) => {
  return () => {
    target(...args);
  };
};

// Target
const statusUpdates = new Map();

const statusUpdateService = {
  postUpdate: (status) => {
    const id = Math.floor(Math.random() * 1000000);
    statusUpdates.set(id, status);
    console.log(`Status posted: ${status}`);
    return id;
  },

  destroyUpdate: (id) => {
    statusUpdates.delete(id);
    console.log(`Status removed: ${id}`);
  },
};

// factory function to create the command 
const createPostStatusCmd = (service, status) => {
  let postId = null;

  return {
    run: () => (postId = service.postUpdate(status)),
    undo: () => {
      if (postId) {
        service.destroyUpdate(postId);
        postId = null;
      }
    },
    serialize() {
      return { type: "status", action: "post", status: status };
    },
  };
};

// Invoker
class Invoker {
    constructor(){
        this.history =[]
    }

    run(cmd){
        this.history.push(cmd)
        cmd.run()
        console.log('Command executed', cmd.serialize())
    }

    delay (cmd, delay) {
        setTimeout(() => {
          console.log('Executing delayed command', cmd.serialize())
          this.run(cmd)
        }, delay)
    }

    undo () {
        const cmd = this.history.pop()
        cmd.undo()
        console.log('Command undone', cmd.serialize())
    }

    async runRemotely (cmd) {
        await superagent
          .post('http://localhost:3000/cmd')
          .send({ json: cmd.serialize() })
        console.log('Command executed remotely', cmd.serialize())
      }
}

// client.js
 
const invoker = new Invoker()
const command = createPostStatusCmd(statusUpdateService, 'HI!')

invoker.run(cmd) // running the command immediately.
invoker.delay(command, 1000 * 3)  // schedule to be called in 3 seconds
