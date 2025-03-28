import child_process from "child_process";

const pwd = child_process.spawn("pwd", ["-g"]);

pwd.stdout.on("data", (data) => console.log(`stdout: ${data}`));
pwd.stderr.on("data", (data) => console.log(`Error ${data}`))
pwd.on("close", (data) => console.log(`exited with code ${data}`))