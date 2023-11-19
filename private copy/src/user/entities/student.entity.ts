import { Book } from 'src/book/entities/book.entity';
import { Major } from 'src/major/entities/major.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  student_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => Major)
  @JoinColumn({ name: "major", referencedColumnName: "major_id" })
  major: Major

  @OneToMany(() => Book, (book) => book.student)
  books: Book[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
