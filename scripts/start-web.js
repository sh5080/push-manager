const exec = require("child_process").exec;
const path = require("path");
const { getNetworkIP } = require("./set-env");

const ip = getNetworkIP();
console.log(`Starting Next.js server on ${ip}:8888`);

const client = exec(
  `cd "${path.join(__dirname, "../src/web")}" && next start -H ${ip} -p 8888`,
  {
    windowsHide: true,
    cwd: path.join(__dirname, "../"),
  }
);

client.stdout.pipe(process.stdout);
client.stderr.pipe(process.stderr);

client.on("error", (error) => {
  console.error("Failed to start web server:", error);
  process.exit(1);
});
