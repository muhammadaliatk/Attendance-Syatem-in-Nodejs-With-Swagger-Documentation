import express, { Express, Request, Response } from "express";
var jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export function authenticateToken(req: Request, res: Response, next: any) {
  try {
    let token = req.headers["authorization"];
    //    token = token && token.split(' ')[1]
    if (token == null) return res.status(401).send("Token NOT PROVIDED");

    jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
      if (err) {
        return res.status(403).send("Token Failed");
      }

      req.body.user = user;
      console.log("user is ", user);
      if (user.role === "ADMIN") {  // Role Authentication
        next();
      } else {
        res.status(500).json({
          message: "Role not correct",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

