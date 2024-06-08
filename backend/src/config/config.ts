import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

export default {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  salt: process.env.SALT_ROUNDS,
};
