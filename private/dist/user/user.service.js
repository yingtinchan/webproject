"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const teacher_entity_1 = require("./entities/teacher.entity");
const admin_entity_1 = require("./entities/admin.entity");
const jwt_1 = require("@nestjs/jwt");
const hash_1 = require("../utils/hash");
const errorhandling_1 = require("../utils/errorhandling");
let UserService = class UserService {
    constructor(adminRepository, studentRepository, teacherRepository, jwtService) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.jwtService = jwtService;
    }
    createStudent(createStudentDto) {
        const data = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(data);
    }
    async findAllStudent() {
        return await this.studentRepository.createQueryBuilder('student')
            .innerJoinAndSelect('student.major', 'major').getMany();
    }
    findOneStudent(id) {
        return this.studentRepository.createQueryBuilder("student")
            .where("student.student_id = :id", { id: id }).getOne();
    }
    updateStudent(id, updateStudentDto) {
        return `This action updates a #${id} student`;
    }
    removeStudent(id) {
        return this.studentRepository.delete(id);
    }
    createTeacher(createTeacherDto) {
        const data = this.teacherRepository.create(createTeacherDto);
        return this.teacherRepository.save(data);
    }
    findAllTeacher() {
        return this.teacherRepository.find();
    }
    findOneTeacher(id) {
        return this.teacherRepository.createQueryBuilder("teacher")
            .where("teacher.teacher_id = :id", { id: id }).getOne();
    }
    updateTeacher(id, updateTeacherDto) {
        return `This action updates a #${id} teacher`;
    }
    removeTeacher(id) {
        return this.teacherRepository.delete(id);
    }
    createAdmin(createAdminDto) {
        const data = this.adminRepository.create(createAdminDto);
        return this.adminRepository.save(data);
    }
    findAllAdmin() {
        return this.adminRepository.find();
    }
    findOneAdmin(id) {
        return `This action returns a #${id} Admin`;
    }
    updateAdmin(id, updateAdminDto) {
        return `This action updates a #${id} Admin`;
    }
    removeAdmin(id) {
        return this.adminRepository.delete(id);
    }
    async login(id, password) {
        var data;
        var payload = {
            id: '',
            name: '',
            role: '',
        };
        if (id.substring(0, 1) == "A") {
            data = await this.adminRepository.findOneBy({ admin_id: id });
            payload.id = data.admin_id;
            payload.role = 'admin';
        }
        else if (id.substring(0, 1) == "S") {
            data = await this.studentRepository.findOneBy({ student_id: id });
            payload.id = data.student_id;
            payload.role = 'student';
        }
        else if (id.substring(0, 1) == "T") {
            data = await this.teacherRepository.findOneBy({ teacher_id: id });
            payload.id = data.teacher_id;
            payload.role = 'teacher';
        }
        payload.name = data.name;
        const token = await this.jwtService.sign(payload);
        if (data == null) {
            throw new errorhandling_1.UserNotExistError();
        }
        else {
            if (await (0, hash_1.checkPassword)(password, data["password"])) {
                return {
                    "statusCode": 200,
                    "msg": "login success",
                    access_token: token,
                    data: data,
                    role: payload.role
                };
            }
            else {
                throw new errorhandling_1.UserPasswordMissMatchError();
            }
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map