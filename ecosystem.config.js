const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "src/shared/.env") });

module.exports = {
  apps: [
    {
      name: "push-web",
      cwd: "C:\\Users\\1\\push-manager",
      script: "npm",
      args: "run web:prod",
      env: {
        NODE_ENV: "production",
        ...process.env,
      },
      error_file: "logs/pm2/push-web-error.log",
      out_file: "logs/pm2/push-web-out.log",
      log_file: "logs/pm2/push-web-combined.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
    {
      name: "push-server",
      cwd: "C:\\Users\\1\\push-manager",
      script: "npm",
      args: "run server:prod",
      env: {
        NODE_ENV: "production",
        ...process.env,
      },
      error_file: "logs/pm2/push-server-error.log",
      out_file: "logs/pm2/push-server-out.log",
      log_file: "logs/pm2/push-server-combined.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
