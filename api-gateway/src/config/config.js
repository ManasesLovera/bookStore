"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//TODO: NO OLVIDES AGREGAR EL PORT EN LA VARIABLE DE ENTORNO
//2TODO: DEBEMOS COORDINAR LO DEL JWT_SECRET, COLOCAR TAMBIEN LA VARIABLE DE ENTORNO EN EL ARHCIVO EXAMPLE.ENV
exports.config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};
