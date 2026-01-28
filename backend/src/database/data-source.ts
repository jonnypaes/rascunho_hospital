// data-source.ts
import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exam } from "../entities/Exam.js";
import { Appointment } from "../entities/Appointment.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "user_aspect",
  password: process.env.DB_PASSWORD || "mudar123",
  database: process.env.DB_NAME || "hospital_management",
  synchronize: true,
  logging: false,
  entities: [Exam, Appointment],
});
