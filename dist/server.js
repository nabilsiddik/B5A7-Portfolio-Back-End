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
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./app/config/db.config");
const seedAdmin_1 = require("./app/utils/seedAdmin");
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.prisma.$connect();
        console.log("DB Connected Successfully");
    }
    catch (error) {
        console.log("DB connection failed", error);
        process.exit(1);
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnect();
    yield (0, seedAdmin_1.seedAdmin)();
    // app.listen(port, async () => {
    //   console.log(`Server is running on port ${port}`);
    // });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
}))();
