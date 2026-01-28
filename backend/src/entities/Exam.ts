import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;
}