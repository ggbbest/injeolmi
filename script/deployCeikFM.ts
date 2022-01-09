import hardhat from "hardhat";

async function main() {
    console.log("deploy start")
    const CeikFM = await hardhat.ethers.getContractFactory("CeikFM")
    const result = await CeikFM.deploy()
    console.log(` address: ${result.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });