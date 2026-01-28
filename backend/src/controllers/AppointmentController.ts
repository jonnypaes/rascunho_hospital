import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source.js";
import { Appointment } from "../entities/Appointment.js";
import { Exam } from "../entities/Exam.js";

export class AppointmentController {
  // Criar um novo agendamento [cite: 12]
  async create(req: Request, res: Response) {
    const { appointmentDate, observations, exam, patientName } = req.body; // [cite: 14, 15, 16]

    try {
      const examRepository = AppDataSource.getRepository(Exam);
      const appointmentRepository = AppDataSource.getRepository(Appointment);
  
      const examId = exam?.id; 
  
      if (!examId) {
        return res.status(400).json({ message: "ID do exame é obrigatório." });
      }
  
      const examExists = await examRepository.findOneBy({ id: Number(examId) });
      if (!examExists) {
        return res.status(404).json({ message: "Exame não encontrado." });
      }
  
      const appointment = appointmentRepository.create({
        exam: examExists,
        scheduled_at: new Date(appointmentDate), // Maps 'appointmentDate' -> 'scheduled_at'
        observations: observations,
        patientName: patientName
      });
  
      await appointmentRepository.save(appointment);
      return res.status(201).json(appointment);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      return res.status(500).json({ message: "Erro ao criar agendamento." });
    }
  }

  // Listar todos os agendamentos [cite: 18]
  async list(req: Request, res: Response) {
    try {
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      
      // Busca agendamentos trazendo os dados do exame relacionado [cite: 19, 20]
      const appointments = await appointmentRepository.find({
        relations: ["exam"],
        order: { scheduled_at: "ASC" }
      });

      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar agendamentos." });
    }
  }

  // Excluir um agendamento [cite: 23, 24]
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const result = await appointmentRepository.delete(id);

      if (result.affected === 0) {
        return res.status(404).json({ message: "Agendamento não encontrado." });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao excluir agendamento." });
    }
  }
}