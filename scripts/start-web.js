const exec = require("child_process").exec;
const path = require("path");

const client = exec("yarn ws:web start", {
  windowsHide: true,
  cwd: path.join(__dirname, "../"),
});

client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);
