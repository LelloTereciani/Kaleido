const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x380ddb85e3c16fb82cbaf9bb639323f959f59b28"; // Substitua pelo endereço do seu token implantado
  const [deployer, recipient] = await hre.ethers.getSigners(); // Obtenha o implantador e outra conta

  const MyToken = await hre.ethers.getContractFactory("MyTokenMintableBurnable");
  const myToken = MyToken.attach(tokenAddress); // Anexa ao contrato existente

  // --- Testando a Cunhagem (Mint) ---
  const amountToMint = hre.ethers.parseUnits("500000", 18); // 500.000 tokens para cunhar
  const deployerBalanceBeforeMint = await myToken.balanceOf(deployer.address);
  const totalSupplyBeforeMint = await myToken.totalSupply();

  console.log(`\n--- Antes da Cunhagem ---`);
  console.log(`Balanço do Proprietário: ${hre.ethers.formatUnits(deployerBalanceBeforeMint, 18)} MTK`);
  console.log(`Suprimento Total: ${hre.ethers.formatUnits(totalSupplyBeforeMint, 18)} MTK`);

  console.log(`Cunhando ${hre.ethers.formatUnits(amountToMint, 18)} MTK para ${deployer.address}...`);
  const mintTx = await myToken.connect(deployer).mint(deployer.address, amountToMint);
  await mintTx.wait();

  const deployerBalanceAfterMint = await myToken.balanceOf(deployer.address);
  const totalSupplyAfterMint = await myToken.totalSupply();

  console.log(`\n--- Depois da Cunhagem ---`);
  console.log(`Balanço do Proprietário: ${hre.ethers.formatUnits(deployerBalanceAfterMint, 18)} MTK`);
  console.log(`Suprimento Total: ${hre.ethers.formatUnits(totalSupplyAfterMint, 18)} MTK`);

  // --- Testando a Queima (Burn) ---
  const amountToBurn = hre.ethers.parseUnits("100", 18); // 100 tokens para queimar
  const deployerBalanceBeforeBurn = await myToken.balanceOf(deployer.address);
  const totalSupplyBeforeBurn = await myToken.totalSupply();

  console.log(`\n--- Antes da Queima ---`);
  console.log(`Balanço do Proprietário: ${hre.ethers.formatUnits(deployerBalanceBeforeBurn, 18)} MTK`);
  console.log(`Suprimento Total: ${hre.ethers.formatUnits(totalSupplyBeforeBurn, 18)} MTK`);

  console.log(`Queimando ${hre.ethers.formatUnits(amountToBurn, 18)} MTK do ${deployer.address}...`);
  const burnTx = await myToken.connect(deployer).burn(amountToBurn);
  await burnTx.wait();

  const deployerBalanceAfterBurn = await myToken.balanceOf(deployer.address);
  const totalSupplyAfterBurn = await myToken.totalSupply();

  console.log(`\n--- Depois da Queima ---`);
  console.log(`Balanço do Proprietário: ${hre.ethers.formatUnits(deployerBalanceAfterBurn, 18)} MTK`);
  console.log(`Suprimento Total: ${hre.ethers.formatUnits(totalSupplyAfterBurn, 18)} MTK`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});