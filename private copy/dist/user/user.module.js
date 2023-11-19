"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("../book/entities/book.entity");
const teacher_entity_1 = require("./entities/teacher.entity");
const major_entity_1 = require("../major/entities/major.entity");
const student_entity_1 = require("./entities/student.entity");
const admin_entity_1 = require("./entities/admin.entity");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../utils/constants");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([book_entity_1.Book, admin_entity_1.Admin, teacher_entity_1.Teacher, student_entity_1.Student, major_entity_1.Major])
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map