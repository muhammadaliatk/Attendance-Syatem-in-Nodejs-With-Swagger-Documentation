"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jwt = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function authenticateToken(req, res, next) {
    try {
        let token = req.headers["authorization"];
        //    token = token && token.split(' ')[1]
        if (token == null)
            return res.status(401).send("Token NOT PROVIDED");
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Token Failed");
            }
            req.body.user = user;
            console.log("user is ", user);
            if (user.role === "ADMIN") { // Role Authentication
                next();
            }
            else {
                res.status(500).json({
                    message: "Role not correct",
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
exports.authenticateToken = authenticateToken;
