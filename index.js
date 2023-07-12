"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const userRoute_1 = __importDefault(require("./nodeProject/route/userRoute"));
const attendanceRoute_1 = __importDefault(require("./nodeProject/route/attendanceRoute"));
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
let port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Attendance System",
            version: "1.0.0",
            description: " API",
        },
        servers: [
            {
                url: "http://localhost:9000",
            },
            {
                url: "https://attendancesystemalphasquad.herokuapp.com",
            },
        ],
    },
    apis: ["./route/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute_1.default);
app.use("/attendance", attendanceRoute_1.default);
app.get('/', (req, res) => {
    res.send('Server running!');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log("yo");
});
