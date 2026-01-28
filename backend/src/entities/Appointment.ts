import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Exam } from "./Exam.js";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "datetime", nullable: true })
  scheduled_at!: Date;

  @Column({ type: "datetime", nullable: true })
  appointmentDate: Date;

  @Column({ type: "text", nullable: true })
  observations!: string;

  @ManyToOne(() => Exam)
  @JoinColumn({ name: "exam_id" })
  exam!: Exam;
  
  @Column({ type: "varchar" })
  patientName: string;
}