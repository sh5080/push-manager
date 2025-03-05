import { exec } from "child_process";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { Config } from "drizzle-kit";

dotenv.config({ path: "./src/.env" });

function createTempConfig() {
  const configPath = path.join(__dirname, "drizzle-config.json");
  const configContent = {
    dialect: "postgresql",
    dbCredentials: { url: process.env.DATABASE_URL! },
    schema: "./src/db/schema.ts",
    out: "./src/db",
    verbose: true,
  } satisfies Config;

  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2));
  return configPath;
}

function cleanupTempFile(configPath: string) {
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
}

function runDrizzleCommand(command: string, configPath: string) {
  console.log(`Running: ${command}`);

  return new Promise<void>((resolve, reject) => {
    const process = exec(command);

    process.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("exit", (code) => {
      if (code === 0) {
        console.log(`Command completed successfully`);
        resolve();
      } else {
        console.error(`Command failed with code ${code}`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function runMigrations() {
  console.log("Running migrations...");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL 환경 변수가 설정되지 않았습니다.");
  }

  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
}

async function main() {
  const command = process.argv[2];

  if (!command) {
    console.error(
      "Command is required. Use: generate, push, pull, studio, or migrate"
    );
    process.exit(1);
  }

  try {
    console.log(`Database: ${process.env.DATABASE_URL}`);
    if (command === "migrate") {
      await runMigrations();
      return;
    }

    const configPath = createTempConfig();

    try {
      switch (command) {
        case "generate":
          await runDrizzleCommand(
            `drizzle-kit generate --config=${configPath}`,
            configPath
          );
          break;
        case "push":
          await runDrizzleCommand(
            `drizzle-kit push --config=${configPath}`,
            configPath
          );
          break;
        case "pull":
          await runDrizzleCommand(
            `drizzle-kit pull --config=${configPath}`,
            configPath
          );
          break;
        case "studio":
          const studioProcess = exec(
            `drizzle-kit studio --port=3333 --config=${configPath}`
          );

          studioProcess.stdout?.on("data", (data) => {
            console.log(data.toString());
          });

          studioProcess.stderr?.on("data", (data) => {
            console.error(data.toString());
          });

          studioProcess.on("exit", (code) => {
            cleanupTempFile(configPath);
            console.log(`Drizzle Studio exited with code ${code}`);
          });

          process.on("SIGINT", () => {
            console.log("Stopping Drizzle Studio...");
            cleanupTempFile(configPath);
            studioProcess.kill();
            process.exit(0);
          });

          return;
        default:
          console.error(`Unknown command: ${command}`);
          process.exit(1);
      }
    } finally {
      if (command !== "studio") {
        cleanupTempFile(configPath);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
