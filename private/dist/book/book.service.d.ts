import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
export declare class BookService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<any>;
    findOne(id: number): string;
    findByName(name: string): Promise<Book[]>;
    findByAuthor(author: string): Promise<Book[]>;
    update(id: number, updateBookDto: UpdateBookDto): string;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
