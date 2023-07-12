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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const client_1 = __importDefault(require("../client"));
const jsonwebtoken = require("jsonwebtoken");
const createUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var user = yield client_1.default.user.create({
            data: users,
        });
        if (user) {
            var tokenGenerator = {
                id: user.id,
                email: user.email,
                name: user.username,
            };
            let token = generateAccessToken(tokenGenerator);
            if (token) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            console.log("user not created");
        }
    }
    catch (error) {
        return error;
    }
});
exports.createUser = createUser;
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client_1.default.user.findMany();
        return user;
    }
    catch (error) {
        return error;
    }
});
exports.getUser = getUser;
const updateUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = users.id;
        let user = yield client_1.default.user.update({
            where: {
                id: Number(id),
            },
            data: {
                username: users.username,
                email: users.email,
            },
        });
        return user;
    }
    catch (error) {
        return error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = users.id;
        const user = yield client_1.default.user.delete({
            where: {
                id: Number(id),
            },
        });
        return user;
    }
    catch (error) {
        return error;
    }
});
exports.deleteUser = deleteUser;
function generateAccessToken(token) {
    return jsonwebtoken.sign(token, "secret");
}
