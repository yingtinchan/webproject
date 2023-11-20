import { Student } from 'src/user/entities/student.entity';
import { Teacher } from 'src/user/entities/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ default: true })
  available: boolean;
  
  // @ManyToOne(() => Student)
  // @JoinColumn({ name: "student", referencedColumnName: "student_id" })
  // student: Student
  @ManyToOne(() => Student, (student) => student.books)
  @JoinColumn({ name: "student", referencedColumnName: "student_id" })
  student: Student

  // @ManyToOne(() => Teacher)
  // @JoinColumn({ name: "teacher", referencedColumnName: "teacher_id" })
  // teacher: Teacher
  @ManyToOne(() => Teacher, (teacher) => teacher.books)
  @JoinColumn({ name: "teacher", referencedColumnName: "teacher_id" })
  teacher: Teacher

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}