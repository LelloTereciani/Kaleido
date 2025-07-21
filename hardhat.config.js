require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Certifique-se de que esta linha está aqui para ler seu .env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28", // Sua versão do Solidity
  networks: {
    // AQUI é onde você define a rede 'kaleido'
    kaleido: {
      url: process.env.KALEIDO_RPC_URL, // Puxa a URL do seu .env
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Puxa a chave privada do seu .env (adiciona o 0x aqui)
    },
    // Você pode ter outras redes aqui se precisar, como 'sepolia', 'arbitrum', etc.
  },
};
