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
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("./../singleton");
const attendance_1 = require("./attendance");
const attendance = {
    id: 1,
    date: "2022-08-23T13:19:31.945Z",
    presentStatus: true,
    userId: 1
};
const users = [
    {
        id: 1,
        username: "xyz",
        email: "xyz@gmail",
        password: "1234",
        lastLogin: "2022-08-23T13:19:31.945Z",
        createdAt: "2022-09-23T13:19:31.945Z",
        updatedAt: "2022-10-23T13:19:31.945Z",
        attendance: [{ id: 1, date: "2022-08-23T13:19:31.945Z", presentStatus: true, userId: 1 }]
    },
    {
        id: 2,
        username: "abc",
        email: "abc@gmail",
        password: "1234",
        lastLogin: "2022-08-23T13:19:31.945Z",
        createdAt: "2022-09-23T13:19:31.945Z",
        updatedAt: "2022-10-23T13:19:31.945Z",
        attendance: [{ id: 2, date: "2022-08-23T13:19:31.945Z", presentStatus: false, userId: 2 }]
    }
];
describe("test Attendance ", () => {
    test("should addAttendance", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.attendance.create.mockResolvedValue(attendance);
        yield expect((0, attendance_1.addAttendance)(attendance)).resolves.toEqual(attendance);
    }));
    test("should updated", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.attendance.update.mockResolvedValue(attendance);
        yield expect((0, attendance_1.updateAttendance)(attendance)).resolves.toEqual(attendance);
    }));
    test("should get summary", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.findMany.mockResolvedValue(users);
        yield expect((0, attendance_1.summary)(users)).resolves.toEqual(users);
    }));
    test("should get userAttendance by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.findUnique.mockResolvedValue(users);
        yield expect((0, attendance_1.getUserAttendance)(users)).resolves.toEqual(users);
    }));
});
