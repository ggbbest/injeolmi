import hardhat from "hardhat";

async function main() {
    console.log("deploy start")
    
    const wCeikPrice = await hardhat.ethers.getContractFactory("wCeikPrice")
    // wCeik : 0xEAD262b2dFEf461CF1C5Ff003fd59DDA82f7Eaa3 wCeik pool : 0x796EA025F2714cff79C4eAaA46D0781152548330    
    const result = await wCeikPrice.deploy("0xEAD262b2dFEf461CF1C5Ff003fd59DDA82f7Eaa3","0x796EA025F2714cff79C4eAaA46D0781152548330")
    console.log(`wCeikPrice address: ${result.address}`)
    //
    //0x5FbDB2315678afecb367f032d93F642f64180aa3
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });