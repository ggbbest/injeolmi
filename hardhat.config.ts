import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import "hardhat-typechain";
import { HardhatUserConfig } from "hardhat/types";
//CEIK_RPC=http://192.168.1.183:20000
const config: HardhatUserConfig = {
  solidity: {
    version: "0.5.6",
  },
  networks: {
    klay: {
      // url: `https://public-node-api.klaytnapi.com/v1/cypress`,
      url: `http://192.168.1.183:20000`,
      accounts: [process.env.PK || ''],
      chainId: 8217,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};

export default config;
