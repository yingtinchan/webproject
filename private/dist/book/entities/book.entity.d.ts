import { Student } from 'src/user/entities/student.entity';
import { Teacher } from 'src/user/entities/teacher.entity';
export declare class Book {
    book_id: number;
    name: string;
    category: string;
    author: string;
    description: string;
    available: boolean;
    student: Student;
    teacher: Teacher;
    created_at: Date;
    updated_at: Date;
}
