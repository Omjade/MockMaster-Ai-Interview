import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://Ai%20Interview%20Mockup_owner:ncMV8a7liIRz@ep-aged-glade-a5866ckk.us-east-2.aws.neon.tech/Ai%20Interview%20Mockup?sslmode=require'
  }
});
