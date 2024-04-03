import { ethers, upgrades } from "hardhat";

async function main() {
  const multitokenContract = await ethers.getContractFactory("Multitoken");
  const contract = await upgrades.deployProxy(multitokenContract);

  await contract.waitForDeployment();

  console.log("MultiToken proxy deployed to:", await contract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
