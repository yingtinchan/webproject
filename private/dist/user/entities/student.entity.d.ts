import { Book } from 'src/book/entities/book.entity';
import { Major } from 'src/major/entities/major.entity';
export declare class Student {
    id: number;
    student_id: string;
    name: string;
    password: string;
    email: string;
    major: Major;
    books: Book[];
    created_at: Date;
    updated_at: Date;
}
