const hre = require("hardhat");

async function main() {
  const MyTokenMintableBurnable = await hre.ethers.getContractFactory("MyTokenMintableBurnable");

  const initialSupply = hre.ethers.parseUnits("1000000", 18); // 1 milhão de tokens iniciais
  const cap = hre.ethers.parseUnits("10000000", 18); // Limite máximo de 10 milhões de tokens

  const myToken = await MyTokenMintableBurnable.deploy(
    "MeuTokenCunhavelQueimavel",
    "MTCQ",
    initialSupply,
    cap
  );

  await myToken.waitForDeployment();

  console.log(`MyTokenMintableBurnable implantado no endereço: ${myToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});