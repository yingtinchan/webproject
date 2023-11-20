import { Book } from 'src/book/entities/book.entity';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    teacher_id: string;
  
    @Column()
    name: string;
  
    @Column()
    password: string;
  
    @Column()
    email: string;

    @OneToMany(() => Book, (book) => book.teacher)
    books: Book[]
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
