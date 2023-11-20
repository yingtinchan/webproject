import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/utils/hash';
import { UserNotExistError, UserPasswordMissMatchError } from 'src/utils/errorhandling';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    private jwtService: JwtService
  ) { }

  createStudent(createStudentDto: CreateStudentDto) {
    const data = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(data);
  }

  async findAllStudent() {
    // return this.studentRepository.find()
    return await this.studentRepository.createQueryBuilder('student')
    .innerJoinAndSelect('student.major', 'major').getMany();
  }

  findOneStudent(id: string) {
    return this.studentRepository.createQueryBuilder("student")
      .where("student.student_id = :id", { id: id }).getOne();
  }

  updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  removeStudent(id: number) {
    return this.studentRepository.delete(id);
  }

  createTeacher(createTeacherDto: CreateTeacherDto) {
    const data = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(data);
  }

  findAllTeacher() {
    return this.teacherRepository.find();
  }

  findOneTeacher(id: string) {
    return this.teacherRepository.createQueryBuilder("teacher")
      .where("teacher.teacher_id = :id", { id: id }).getOne();
  }

  updateTeacher(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  removeTeacher(id: number) {
    return this.teacherRepository.delete(id);
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    const data = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(data);
  }

  findAllAdmin() {
    return this.adminRepository.find();
  }

  findOneAdmin(id: number) {
    return `This action returns a #${id} Admin`;
  }

  updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} Admin`;
  }

  removeAdmin(id: number) {
    return this.adminRepository.delete(id);
  }

  async login(id: string, password: string) {
    var data: Teacher | Admin | Student |any;
    var payload: { id:string, name:string, role:string} = {
      id:'',
      name:'',
      role:'',
    };   
    if (id.substring(0, 1) == "A") {
      data = await this.adminRepository.findOneBy({ admin_id: id })
      payload.id = data.admin_id;
      payload.role = 'admin'
    } else if (id.substring(0, 1) == "S") {
      data = await this.studentRepository.findOneBy({ student_id: id })
      payload.id = data.student_id;
      payload.role = 'student'
    } else if (id.substring(0, 1) == "T") {
      data = await this.teacherRepository.findOneBy({ teacher_id: id })
      payload.id = data.teacher_id;
      payload.role = 'teacher'
    }
    payload.name = data.name;
    const token = await this.jwtService.sign(payload);

    if (data == null) {
      throw new UserNotExistError();
    } else {
      if (await checkPassword(password, data["password"])) {
        return {
          "statusCode": 200,
          "msg": "login success",
          access_token: token,
          data: data,
          role: payload.role
        };
      } else {
        throw new UserPasswordMissMatchError();
      }
    }
  }
}
