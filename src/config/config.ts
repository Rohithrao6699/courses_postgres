import * as dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: string;
  JWT_SECRET: string;
}

export const config: Config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};
