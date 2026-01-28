import { AppDataSource } from "./data-source.js";
import { Exam } from "../entities/Exam.js";

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Exam);

  const data = [
    { name: "MRI Scan", description: "Head scan" },
    { name: "X-Ray", description: "Chest" }
  ];

  await repo.save(data);
  console.log("✅ Database seeded!");
  process.exit();
}

seed().catch(console.error);