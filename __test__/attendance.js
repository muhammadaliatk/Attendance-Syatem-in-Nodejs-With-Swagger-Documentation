"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAttendance = exports.summary = exports.updateAttendance = exports.addAttendance = void 0;
const client_1 = __importDefault(require("../client"));
const addAttendance = (attendance) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addAttendance = yield client_1.default.attendance.create({
            data: attendance,
        });
        return addAttendance;
    }
    catch (error) {
        return error;
    }
});
exports.addAttendance = addAttendance;
const updateAttendance = (attendance) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = attendance.id;
        let updateAttendance = yield client_1.default.attendance.update({
            where: {
                id: Number(id),
            },
            data: {
                presentStatus: attendance.presentStatus,
                userId: attendance.userId,
            },
        });
        return updateAttendance;
    }
    catch (error) {
        return error;
    }
});
exports.updateAttendance = updateAttendance;
const summary = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield client_1.default.user.findMany({
            include: {
                attendance: true,
            },
        });
        return attendance;
    }
    catch (error) {
        console.log(error);
    }
});
exports.summary = summary;
const getUserAttendance = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield client_1.default.user.findUnique({
            where: {
                id: users.id,
            },
            include: {
                attendance: true,
            },
        });
        return attendance;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserAttendance = getUserAttendance;
