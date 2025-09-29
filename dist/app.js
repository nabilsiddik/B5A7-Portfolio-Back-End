"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./app/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({
    origin: 'https://b5-a7-portfolio-front-end.vercel.app',
    credentials: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('App is running');
});
app.use('/api/v1', routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.'
    });
});
exports.default = app;
