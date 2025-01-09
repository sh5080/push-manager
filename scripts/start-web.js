const exec = require("child_process").exec;
const path = require("path");
const { getNetworkIP } = require("./set-env");

const ip = getNetworkIP();
console.log(`[Debug] Starting Next.js server on ${ip}:8888`);

const webDir = path.join(__dirname, "../src/web");
const nextBin = path.join(webDir, "node_modules/.bin/next");
const command = `cd "${webDir}" && "${nextBin}" start -H ${ip} -p 8888`;

console.log(`[Debug] Executing command: ${command}`);

const client = exec(command, {
  windowsHide: true,
  cwd: path.join(__dirname, "../"),
  encoding: "utf8",
});

client.stdout.setEncoding("utf8");
client.stderr.setEncoding("utf8");

client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);

client.stdout.on("data", (data) => {
  console.log(`[stdout] ${data}`);
});

client.stderr.on("data", (data) => {
  console.error(`[stderr] ${data}`);
});

client.on("error", (error) => {
  console.error("[Error] Failed to start web server:", error);
  process.exit(1);
});

client.on("exit", (code) => {
  console.log(`[Exit] Process exited with code ${code}`);
});
