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
exports.updateAttendance = exports.summary = exports.getUserAttendance = exports.addAttendance = void 0;
const client_1 = require("@prisma/client");
const nodemailer = require("nodemailer");
const prisma = new client_1.PrismaClient();
const dotenv = require('dotenv');
dotenv.config();
const date = new Date();
const addAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield prisma.attendance.create({
            data: {
                date: new Date(),
                presentStatus: req.body.presentStatus,
                userId: req.body.userId,
            },
        });
        if (attendance) {
            sendEmail(); // Call Send Email Function
        }
        res.status(200).send({
            data: attendance,
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
exports.addAttendance = addAttendance;
const getUserAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const attendance = yield prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                attendance: true,
            },
        });
        res.status(200).json({
            success: true,
            data: attendance,
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
exports.getUserAttendance = getUserAttendance;
const summary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield prisma.user.findMany({
            include: {
                attendance: true,
            },
        });
        res.status(200).send({
            data: attendance,
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
exports.summary = summary;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let attendance = yield prisma.attendance.update({
            where: {
                id: Number(id),
            },
            data: {
                presentStatus: req.body.presentStatus,
                userId: req.body.userId,
            },
        });
        res.status(200).send({
            data: attendance,
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
exports.updateAttendance = updateAttendance;
// Function for send Email
const sendEmail = () => {
    try {
        var from = "muhammadali.alphasquad@gmail.com";
        var to = "muhammadali.alphasquad@gmail.com";
        var subject = "Attendance";
        var text = " ";
        var html = "Attendance Added";
        const mailOption = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: "gmail",
            secure: true,
            port: process.env.PORT2,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });
        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Email Sent!");
            }
        });
    }
    catch (error) {
        return error;
    }
};
