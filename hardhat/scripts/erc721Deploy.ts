import { ethers } from "hardhat";

async function main() {
  const SeanapseNFT = await ethers.getContractFactory("SeanapseNFT");
  const seanapse = await SeanapseNFT.deploy();

  await seanapse.deployed();

  console.log("SeanapseNFT deployed to:", seanapse.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
