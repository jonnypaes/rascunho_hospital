import { Router } from "express";
import { ExamController } from "./controllers/ExamController.js";
import { AppointmentController } from "./controllers/AppointmentController.js";

const routes = Router();
const examController = new ExamController();
const appointmentController = new AppointmentController();

// Rotas de Exames
routes.get("/exams", examController.list); // [cite: 6]

// Rotas de Agendamentos
routes.get("/appointments", appointmentController.list);      // Listar [cite: 17]
routes.post("/appointments", appointmentController.create);    // Criar [cite: 12]
routes.delete("/appointments/:id", appointmentController.delete); // Excluir [cite: 23]

export { routes };