const hre = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()

    const SmallBank = await ethers.getContractFactory("smallBank")
    const smallBank = await SmallBank.deploy();
    await smallBank.deployed()

    console.log(`contract deployed at ${smallBank.address}`);
}

main().catch((error)=> {
    console.log(error);
    process.exitCode =1;
})