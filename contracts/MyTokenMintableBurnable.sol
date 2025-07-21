// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol"; // Importa a extensão para limite de cunhagem
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyTokenMintableBurnable is ERC20, ERC20Burnable, ERC20Capped, Ownable {
    // O construtor agora também recebe 'cap' para o ERC20Capped
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 cap // Novo parâmetro: limite máximo de tokens
    )
        ERC20(name, symbol) // Inicializa o ERC20
        ERC20Capped(cap)    // Inicializa o ERC20Capped com o limite
        Ownable(msg.sender) // Define o implantador como proprietário
    {
        // Cunhar o suprimento inicial para o implantador
        // Esta chamada a _mint é a primeira cunhagem e deve respeitar o 'cap'
        _mint(msg.sender, initialSupply);
    }

    // Função para permitir que o proprietário (owner) cunhe novos tokens
    // Esta função só pode ser chamada pelo proprietário do contrato.
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount); // Chama a função interna _mint do ERC20
    }

    // Sobrescreve a função _update do ERC20 para incluir a validação do cap
    // Esta função é chamada automaticamente por _mint e _burn
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Capped) {
        super._update(from, to, value);
    }

    // Função para receber Ether (opcional, se o contrato precisar segurar Ether)
    receive() external payable {}
}