"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
(async () => {
    const raw = fs_1.default.readFileSync("raw.txt");
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
    fs_1.default.writeFileSync("addresses.txt", JSON.stringify(addresses));
})();
//# sourceMappingURL=find-address-from-raw.js.map