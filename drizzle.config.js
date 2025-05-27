import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_1HIXaUOmYu6g@ep-black-dust-a5q4xfn0-pooler.us-east-2.aws.neon.tech/AI%20Interview%20Mocker?sslmode=require'
  }
});