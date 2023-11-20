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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const create_student_dto_1 = require("./dto/create-student.dto");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const update_teacher_dto_1 = require("./dto/update-teacher.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const auth_guard_1 = require("./auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(body) {
        let id = body.id.trim();
        let password = body.password.trim();
        return this.userService.login(id, password);
    }
    async createStudent(createStudentDto) {
        let findlastid = await this.userService.findAllStudent();
        let genid = "S" + (findlastid.length + 1).toString();
        while (genid.length < 8) {
            genid = genid.substring(0, 1) + '0' + genid.substring(1);
        }
        createStudentDto.student_id = genid;
        return this.userService.createStudent(createStudentDto);
    }
    findAllStudent() {
        return this.userService.findAllStudent();
    }
    findOneStudent(id) {
        return this.userService.findOneStudent(id);
    }
    updateStudent(id, updateStudentDto) {
        return this.userService.updateStudent(+id, updateStudentDto);
    }
    removeStudent(id) {
        return this.userService.removeStudent(+id);
    }
    async createTeacher(createTeacherDto) {
        let findlastid = await this.userService.findAllTeacher();
        let genid = "T" + (findlastid.length + 1).toString();
        while (genid.length < 8) {
            genid = genid.substring(0, 1) + '0' + genid.substring(1);
        }
        createTeacherDto.teacher_id = genid;
        return this.userService.createTeacher(createTeacherDto);
    }
    findAllTeacher() {
        return this.userService.findAllTeacher();
    }
    findOneTeacher(id) {
        return this.userService.findOneTeacher(id);
    }
    updateTeacher(id, updateTeacherDto) {
        return this.userService.updateTeacher(+id, updateTeacherDto);
    }
    removeTeacher(id) {
        return this.userService.removeTeacher(+id);
    }
    async createAdmin(createAdminDto) {
        let findlastid = await this.userService.findAllAdmin();
        let genid = "A" + (findlastid.length + 1).toString();
        while (genid.length < 8) {
            genid = genid.substring(0, 1) + '0' + genid.substring(1);
        }
        createAdminDto.admin_id = genid;
        return this.userService.createAdmin(createAdminDto);
    }
    findAllAdmin() {
        return this.userService.findAllAdmin();
    }
    findOneAdmin(id) {
        return this.userService.findOneAdmin(+id);
    }
    updateAdmin(id, updateAdminDto) {
        return this.userService.updateAdmin(+id, updateAdminDto);
    }
    removeAdmin(id) {
        return this.userService.removeAdmin(+id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/student'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createStudent", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/student'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllStudent", null);
__decorate([
    (0, common_1.Get)('/student/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneStudent", null);
__decorate([
    (0, common_1.Patch)('/student/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/student/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Post)('/teacher'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Get)('/teacher'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllTeacher", null);
__decorate([
    (0, common_1.Get)('/teacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneTeacher", null);
__decorate([
    (0, common_1.Patch)('/teacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_teacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateTeacher", null);
__decorate([
    (0, common_1.Delete)('/teacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeTeacher", null);
__decorate([
    (0, common_1.Post)('/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Get)('/admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('/admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneAdmin", null);
__decorate([
    (0, common_1.Patch)('/admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Delete)('/admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeAdmin", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map