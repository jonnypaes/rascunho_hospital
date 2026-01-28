import { DataSource } from "typeorm";
import { Exam } from "../../entities/Exam.js";

export const seedExams = async (dataSource: DataSource) => {
  const examRepository = dataSource.getRepository(Exam);

  // Dados iniciais para o sistema
  const defaultExams = [
    { name: "Hemograma Completo", specialty: "Hematologia" },
    { name: "Ressonância Magnética", specialty: "Radiologia" },
    { name: "Eletrocardiograma", specialty: "Cardiologia" },
    { name: "Ultrassonografia Abdominal", specialty: "Radiologia" },
    { name: "Teste de Esforço", specialty: "Cardiologia" },
  ];

  for (const data of defaultExams) {
    const exists = await examRepository.findOneBy({ name: data.name });
    
    if (!exists) {
      const exam = examRepository.create(data);
      await examRepository.save(exam);
      console.log(`Exame inserido: ${data.name}`);
    }
  }
};