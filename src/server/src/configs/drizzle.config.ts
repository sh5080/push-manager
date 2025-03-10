import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: "postgresql://postgres@localhost:5433/postgres",
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
});
