"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import gatewayRoutes from './routes/gatewayRoutes';
// import { config } from './config/config';
const app = (0, express_1.default)();
// const port = config.PORT || 3000;
//Following line is temporary, will remove once complete the env file.
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//TODO: UNA VEZ COMPLETEMOS EL GATEWAYROUTES, TEST THIS ROUTE
// app.use('/api', gatewayRoutes);
//test basic server:
app.get('/helloWorld', (req, res) => {
    res
        .status(200)
        .json({ message: 'Hello world' });
});
app.listen(port, () => {
    console.log(`API Gateway running on port http://localhost:${port}`);
});
