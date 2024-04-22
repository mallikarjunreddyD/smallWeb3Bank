const hre = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()
    const SmallBank = await ethers.getContractFactory("smallBank")
    const smallBank = await SmallBank.deploy();
    await smallBank.deployed()

    console.log(`contract deployed at ${smallBank.address}`);
    const transaction = await smallBank.connect(deployer).transferFromBank(deployer.address,1000)
    const receipt = await transaction.wait()
    const balance = await smallBank.connect(deployer).balanceOf(deployer.address);
    console.log(` Address ${deployer.address}  balance is ${balance}`)
}

main().catch((error)=> {
    console.log(error);
    process.exitCode =1;
})