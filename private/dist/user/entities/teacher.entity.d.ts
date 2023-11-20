import { Book } from 'src/book/entities/book.entity';
export declare class Teacher {
    id: number;
    teacher_id: string;
    name: string;
    password: string;
    email: string;
    books: Book[];
    created_at: Date;
    updated_at: Date;
}
