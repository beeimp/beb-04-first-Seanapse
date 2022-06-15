// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SeanapseNFT is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("SeanapseNFT", "SNFT") {}

    // NFT 가격 및 구매 여부 Structure
    struct NftPrice {
        bool available; // false: 구매 불가능, true: 구매 가능
        uint256 price;
    }

    // NFT 가격 및 구매 여부 매핑
    mapping(uint256 => NftPrice) nftPrices;

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        nftPrices[newItemId] = NftPrice({available: false, price: 0});

        return newItemId;
    }

    // NFT 판매 조회
    function isAvailable(uint256 _tokenId) public view returns (bool) {
        return nftPrices[_tokenId].available;
    }

    // NFT 가격 조회
    function isAvailable(uint256 _tokenId) public view returns (uint256) {
        require(nftPrices[_tokenId].available);
        return nftPrices[_tokenId].price;
    }

    // NFT 판매 함수
    function sellNFT(
        address _address,
        uint256 _tokenId,
        uint256 _price
    ) public {
        address owner = ownerOf(_tokenId);
        require(owner == _address);
        nftPrices[_tokenId].available = true;
        nftPrices[_tokenId].price = _price;
    }

    // NFT 구매 함수
    function buyNFT(uint _tokenId) public payable {
        require(nftPrices[_tokenId].price == msg.value);
        address payable owner = payable(ownerOf(_tokenId));
        owner.transfer(nftPrices[_tokenId].price);
        transferFrom(owner, msg.sender, _tokenId);
    }
}
