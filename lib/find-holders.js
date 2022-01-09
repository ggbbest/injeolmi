"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const fs_1 = __importDefault(require("fs"));
const superagent_1 = __importDefault(require("superagent"));
const TOTAL_PAGE = 220;
const exclude = require("./addresses.json");
let totalAmount = bignumber_1.BigNumber.from("0");
(async () => {
    const results = [];
    const promises = [];
    for (let page = 1; page <= TOTAL_PAGE; page += 1) {
        promises.push(new Promise(async (resolve) => {
            const run = async () => {
                try {
                    const result = (await superagent_1.default.get(`https://api-cypress.scope.klaytn.com/v1/tokens/0x18814b01b5cc76f7043e10fd268cc4364df47da0/holders?page=${page}`)).body;
                    for (const data of result.result) {
                        if (data.address.toLowerCase() !== "0x18814b01b5cc76f7043e10fd268cc4364df47da0".toLowerCase() &&
                            data.address.toLowerCase() !== "0x280c0Ea797dCC1b1292975EB3Edb1886F89a37CD".toLowerCase() &&
                            data.address.toLowerCase() !== "0xE1eFF4230c2cf812e4f5214ACe5a1888f2b1A68e".toLowerCase()) {
                            let amount = bignumber_1.BigNumber.from(data.amountHeld);
                            if (exclude.includes(data.address) === true) {
                                amount = amount.sub(bignumber_1.BigNumber.from("1000000000000"));
                            }
                            amount = amount.mul(8).div(10);
                            results.push({ address: data.address, amount: amount.toString() });
                            totalAmount = totalAmount.add(amount);
                        }
                    }
                }
                catch (error) {
                    console.log(error, "Retry...");
                    await run();
                }
            };
            await run();
            resolve();
        }));
    }
    await Promise.all(promises);
    console.log(totalAmount.toString());
    for (let i = 0; i < results.length / 500; i += 1) {
        const addresses = [];
        const amounts = [];
        for (let j = 0; j < 500; j += 1) {
            if (results[i * 500 + j] !== undefined) {
                addresses.push(results[i * 500 + j].address);
                amounts.push(results[i * 500 + j].amount);
            }
        }
        fs_1.default.writeFileSync(`./parameters/parameter${i}.txt`, JSON.stringify(addresses) + "\n\n" + JSON.stringify(amounts));
    }
})();
//# sourceMappingURL=find-holders.js.map