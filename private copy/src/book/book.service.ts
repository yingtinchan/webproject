import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ){}

  create(createBookDto: CreateBookDto) {
    const data = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(data);
  }

  async findAll() {
    return this.bookRepository.find();
    // return await this.bookRepository.createQueryBuilder('book')
    // .innerJoinAndSelect('student.student_id', 'student_id')
    // .innerJoinAndSelect('teacher.teacher_id', 'teacher_id')
    // .innerJoinAndSelect('student.name', 'student name')
    // .innerJoinAndSelect('teacher.name', 'teacher name').getMany();
    // return await this.bookRepository.createQueryBuilder('book')
    // .innerJoinAndSelect('book.student', 'student')
    // .innerJoinAndSelect('book.teacher', 'teacher').getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  findByName(name:string){
    return this.bookRepository
    .createQueryBuilder("book")
    .where("book.name like :name", { name:`%${name}%` })
    .getMany();
  }

  findByAuthor(author:string){
    return this.bookRepository
    .createQueryBuilder("book")
    .where("book.author like :author", { author:`%${author}%` })
    .getMany();
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return 'updateBook'
    // return this.bookRepository.update(id, {    
    //   available: false,
    //   borrower_student_id: updateBookDto.borrower_student_id as string,
    //   borrower_teacher_id: updateBookDto.borrower_teacher_id as string});
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
