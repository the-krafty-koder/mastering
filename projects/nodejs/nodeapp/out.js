process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write("data:" + chunk);
  }
});

process.stdin.on("end", function () {
  process.stdout.write("end");
});
