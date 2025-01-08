const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "src/shared/.env") });

module.exports = {
  apps: [
    {
      name: "push-web",
      cwd: "C:\\Users\\1\\push-manager",
      script: "yarn",
      args: "web:prod",
      env: {
        NODE_ENV: "production",
        ...process.env,
      },
    },
    {
      name: "push-server",
      cwd: "C:\\Users\\1\\push-manager",
      script: "yarn",
      args: "server:prod",
      env: {
        NODE_ENV: "production",
        ...process.env,
      },
    },
  ],
};
