import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process
  console.error("⚠️  Couldn't find .env file  ⚠️");
  setTimeout(() => {
    process.exit(1);
  }, 2000);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const MONGODB_URI: string = process.env.MONGODB_URI as string;

export default {
  port: PORT,
  databaseURL: MONGODB_URI
};
