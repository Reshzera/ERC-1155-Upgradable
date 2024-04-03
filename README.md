# Multitoken Solidity Project

## Project Overview

Multitoken is a cutting-edge ERC1155 smart contract developed with OpenZeppelin's upgradeable contracts. It is designed to support multiple token types within a single contract, allowing for the minting, burning, and management of both fungible and non-fungible tokens (NFTs). This project is compatible with OpenZeppelin Contracts ^5.0.0 and utilizes features like upgradeability and supply tracking to offer a flexible and efficient approach to token management on the Ethereum blockchain.

## Features

- ERC1155 implementation for managing a mixed collection of fungible and non-fungible tokens.
- Upgradeable smart contract functionality, ensuring future-proof adaptability and enhancements.
- Integrated burning functionality, allowing token holders to destroy both fungible and non-fungible tokens.
- Owner-restricted functions for secure management, including token minting and contract withdrawals.
- Supply tracking for all token types, enforcing maximum supply limits to preserve token scarcity.
- Set token price and maximum supply for each token type, providing control over the economics of the token ecosystem.

## Installation

To set up the Multitoken project for development:

1. Clone the repository.
2. Run `yarn install` to install the required dependencies.
3. Configure your `.env` file to securely manage environment variables.

## Usage

Yarn scripts available for interaction with the contract:

- `yarn compile`: Compiles the smart contract.
- `yarn test`: Executes tests to ensure contract reliability and security.
- `yarn start`: Launches a local blockchain environment for development and testing.
- `yarn deploy:sepolia`: Deploys the contract to the Sepolia testnet for public testing.
- `yarn deploy:dev`: Deploys the contract to a local blockchain for development purposes.

## Contract Functions

- `initialize()`: Initializes the contract with base URI, token price, and maximum supply.
- `mint(id, amount)`: Allows users to mint specified token types and quantities, given they meet price and supply conditions.
- `withdraw()`: Enables the contract owner to withdraw the contract's balance for operational liquidity.
- `uri(id)`: Returns the metadata URI for a specific token ID, adhering to the ERC1155 metadata standards.

## Requirements

- Node.js
- Yarn or npm for dependency management.
- Hardhat for compilation, testing, and deployment of the smart contract.

## Configuration

Ensure your `hardhat.config.js` is correctly set up for deployment and testing, with network parameters and private keys securely stored in your `.env` file.

## Contributing

Contributions to Multitoken are welcome. Please fork the repository, commit your changes to a new branch, and open a pull request for review.

## License

This project is licensed under the MIT license, encouraging open and collaborative development.
