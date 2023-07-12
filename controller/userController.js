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
exports.logInUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, Number(process.env.SALT));
        const user = yield prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                lastLogin: new Date(),
                createdAt: new Date(),
                role: req.body.role
            },
        });
        let tokenGenerator = {
            id: user.id,
            email: user.email,
            name: user.username,
        };
        let token = jwt.sign(tokenGenerator, process.env.SECRET, {
            expiresIn: "1y",
        });
        let data = {
            userId: user.id,
            token: token,
        };
        res.status(200).send({
            data: data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findMany();
        res.status(200).send({
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let user = yield prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                username: req.body.username,
                email: req.body.email,
            },
        });
        res.status(200).send({
            data: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send({
            message: "User deleted",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.deleteUser = deleteUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        let user = yield prisma.user.findFirst({
            where: { email: email },
        });
        if (user !== null) {
            if ((yield bcrypt.compare(password, user.password)) === true) {
                let tokenGenerator = {
                    id: user.id,
                    email: user.email,
                    name: user.first_name,
                    role: user.role
                };
                let token = jwt.sign(tokenGenerator, process.env.SECRET, {
                    expiresIn: "1y",
                });
                let data = {
                    user_id: user.id,
                    token: token,
                };
                let updateLastLogin = yield prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        lastLogin: new Date(),
                    },
                });
                res.status(200).json({
                    success: true,
                    data: data,
                });
            }
            else {
                res.status(403).json({
                    success: false,
                    message: "Invalid password",
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.logInUser = logInUser;
