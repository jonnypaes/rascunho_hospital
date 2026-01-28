import "reflect-metadata";
import express from "express";
import cors from "cors";
import { routes } from "./routes.js";
import { AppDataSource } from "./database/data-source.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

async function bootstrap() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("✅ Data Source has been initialized");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  }
}

bootstrap();

export { app };
