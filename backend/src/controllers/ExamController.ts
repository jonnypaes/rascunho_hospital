import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source.js";
import { Exam } from "../entities/Exam.js";

export class ExamController {
  async list(req: Request, res: Response) {
    try {
      const examRepository = AppDataSource.getRepository(Exam);
      
      const exams = await examRepository.find();

      return res.json(exams);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar exames." });
    }
  }
}