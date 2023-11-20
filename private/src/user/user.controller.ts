import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from './auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() body: {id:string, password:string}){
    let id = body.id.trim();
    let password = body.password.trim();
    return this.userService.login(id, password);
  }
  
  @Post('/student')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    let findlastid = await this.userService.findAllStudent()
    let genid = "S"+(findlastid.length+1).toString();
    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createStudentDto.student_id = genid
    return this.userService.createStudent(createStudentDto);
  }

  @UseGuards(AuthGuard)
  @Get('/student')
  findAllStudent() {
    return this.userService.findAllStudent();
  }

  @Get('/student/:id')
  findOneStudent(@Param('id') id: string) {
    return this.userService.findOneStudent(id);
  }

  @Patch('/student/:id')
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.userService.updateStudent(+id, updateStudentDto);
  }

  @Delete('/student/:id')
  removeStudent(@Param('id') id: string) {
    return this.userService.removeStudent(+id);
  }

  @Post('/teacher')
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    let findlastid = await this.userService.findAllTeacher()
    let genid = "T"+(findlastid.length+1).toString();
    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createTeacherDto.teacher_id = genid
    return this.userService.createTeacher(createTeacherDto);
  }

  @Get('/teacher')
  findAllTeacher() {
    return this.userService.findAllTeacher();
  }

  @Get('/teacher/:id')
  findOneTeacher(@Param('id') id: string) {
    return this.userService.findOneTeacher(id);
  }

  @Patch('/teacher/:id')
  updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.userService.updateTeacher(+id, updateTeacherDto);
  }

  @Delete('/teacher/:id')
  removeTeacher(@Param('id') id: string) {
    return this.userService.removeTeacher(+id);
  }

  @Post('/admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    let findlastid = await this.userService.findAllAdmin()
    let genid = "A"+(findlastid.length+1).toString();
    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createAdminDto.admin_id = genid
    return this.userService.createAdmin(createAdminDto);
  }

  @Get('/admin')
  findAllAdmin() {
    return this.userService.findAllAdmin();
  }

  @Get('/admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.userService.findOneAdmin(+id);
  }

  @Patch('/admin/:id')
  updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.userService.updateAdmin(+id, updateAdminDto);
  }

  @Delete('/admin/:id')
  removeAdmin(@Param('id') id: string) {
    return this.userService.removeAdmin(+id);
  }
}
