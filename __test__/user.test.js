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
const user_1 = require("./user");
const users = {
    id: 1,
    username: "xyz",
    email: "xyz@gmail",
    password: "1234",
    lastLogin: "2022-08-23T13:19:31.945Z",
    createdAt: "2022-09-23T13:19:31.945Z",
    updatedAt: "2022-10-23T13:19:31.945Z",
};
describe("test users ", () => {
    test("should create users", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.create.mockResolvedValue(users);
        yield expect((0, user_1.createUser)(users)).resolves.toEqual(true);
    }));
    test("should get all user", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.findMany.mockResolvedValue(users);
        yield expect((0, user_1.getUser)()).resolves.toEqual(users);
    }));
    test("should updated", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.update.mockResolvedValue(users);
        yield expect((0, user_1.updateUser)(users)).resolves.toEqual(users);
    }));
    test("should updated", () => __awaiter(void 0, void 0, void 0, function* () {
        singleton_1.prismaMock.user.delete.mockResolvedValue(users);
        yield expect((0, user_1.deleteUser)(users)).resolves.toEqual(users);
    }));
});
