-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS hospital_management;

USE hospital_management;

-- Tabela de tipos de exames (Referência)
CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL
);

-- Tabela de agendamentos realizados
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    observations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_ExamAppointment FOREIGN KEY (exam_id) 
        REFERENCES exams(id) ON DELETE CASCADE
);

-- INSERÇÕES DE TESTE (Populando os dados iniciais)
-- Populando exames disponíveis
INSERT INTO exams (name, specialty) VALUES 
('Hemograma Completo', 'Hematologia'),
('Ressonância Magnética', 'Radiologia'),
('Eletrocardiograma', 'Cardiologia');

-- Populando um agendamento inicial para teste
-- (Vinculado ao exame ID 1 - Hemograma)
INSERT INTO appointments (exam_id, scheduled_at, observations) 
VALUES (1, '2025-05-20 09:00:00', 'Paciente deve estar em jejum de 12 horas.');