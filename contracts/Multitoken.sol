// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Multitoken is
    Initializable,
    ERC1155Upgradeable,
    ERC1155BurnableUpgradeable,
    OwnableUpgradeable,
    ERC1155SupplyUpgradeable
{
    uint public constant ID1 = 0;
    uint public constant ID2 = 1;
    uint public constant ID3 = 2;
    string public constant BASE_URI = "https://myapi.com/token/";

    uint public tokenPrice;
    uint[] public maxSupply;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init(BASE_URI);
        __ERC1155Burnable_init();
        __Ownable_init(msg.sender);
        __ERC1155Supply_init();
        tokenPrice = 0.01 ether;
        maxSupply = [50, 50, 50]; //[ID1, ID2, ID3]
    }

    function mint(uint256 id, uint256 amount) external payable {
        require(id < 3, "Invalid id");
        require(amount > 0, "Invalid amount");
        require(msg.value == tokenPrice * amount, "Invalid price");
        require(
            totalSupply(id) + amount <= maxSupply[id],
            "Max supply reached"
        );

        _mint(msg.sender, id, amount, "");
    }

    function uri(uint256 id) public pure override returns (string memory) {
        return string.concat(BASE_URI, Strings.toString(id), ".json");
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        address payable _owner = payable(owner());
        (bool success, ) = _owner.call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._update(from, to, ids, values);
    }
}
