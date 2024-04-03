import { ethers, upgrades } from "hardhat";
import dotenv from "dotenv";
dotenv.config();

const CONRTACT_ADDRESS = `${process.env.PROXY_CONTRACT_ADDRESS}`;

async function main() {
  const multitokenContract = await ethers.getContractFactory("Multitoken");
  const contract = await upgrades.upgradeProxy(
    CONRTACT_ADDRESS,
    multitokenContract
  );

  await contract.waitForDeployment();
  console.log("MultiToken proxy updated to:", await contract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
