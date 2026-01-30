// data-source.ts
import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exam } from "../entities/Exam.js";
import { Appointment } from "../entities/Appointment.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Exam, Appointment],
  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  }
});

