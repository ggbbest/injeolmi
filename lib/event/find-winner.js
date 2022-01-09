"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
(async () => {
    const raw = fs_1.default.readFileSync("addresses.txt");
    const splits = raw.toString().split("\n");
    const addresses = [];
    for (const split of splits) {
        if (split.indexOf("0x") === 0) {
            const address = split.trim();
            if (address.length === 42 && addresses.includes(address) !== true) {
                addresses.push(address);
            }
        }
    }
    const founds = [];
    const find = () => {
        const found = Math.floor(Math.random() * addresses.length);
        if (founds.includes(addresses[found]) === true) {
            find();
        }
        else {
            founds.push(addresses[found]);
            console.log(addresses[found]);
        }
    };
    console.log("수상자 목록");
    for (let i = 0; i < 10; i += 1) {
        find();
    }
    console.log("만약 수상자 중 정보가 잘못된 경우를 위한 대기자 목록");
    for (let i = 0; i < 5; i += 1) {
        find();
    }
})();
//# sourceMappingURL=find-winner.js.map