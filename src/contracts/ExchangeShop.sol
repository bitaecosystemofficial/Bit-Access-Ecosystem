// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract ExchangeShop {
    IERC20 public bitToken;
    address public owner;
    
    // BIT token has 9 decimals
    uint256 public constant TOKEN_DECIMALS = 9;

    // Admin whitelist for managing items
    mapping(address => bool) public adminWhitelist;
    address[] public adminList;

    struct Item {
        uint256 id;
        string name;
        string description;
        uint256 price; // Price in BIT tokens (with 9 decimals)
        address merchant;
        uint256 stock;
        bool active;
        string category;
        string imageUrl; // IPFS URL from NFT.storage
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Exchange {
        address buyer;
        uint256 itemId;
        uint256 price;
        uint256 timestamp;
    }

    mapping(uint256 => Item) public items;
    mapping(uint256 => Exchange[]) public itemExchanges;
    mapping(address => uint256[]) public userPurchases;
    uint256 public nextItemId;
    uint256 public totalExchanges;
    uint256 public totalVolumeTraded;

    event ItemListed(
        uint256 indexed id,
        string name,
        uint256 price,
        address indexed merchant,
        uint256 stock,
        string imageUrl,
        uint256 timestamp
    );
    
    event ItemUpdated(
        uint256 indexed id,
        uint256 price,
        uint256 stock,
        bool active,
        uint256 timestamp
    );
    
    event ItemExchanged(
        address indexed buyer,
        uint256 indexed itemId,
        string itemName,
        uint256 price,
        address indexed merchant,
        uint256 timestamp
    );

    event AdminAdded(address indexed admin, uint256 timestamp);
    event AdminRemoved(address indexed admin, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: owner only");
        _;
    }

    modifier onlyAdmin() {
        require(adminWhitelist[msg.sender] || msg.sender == owner, "Not authorized: admin only");
        _;
    }

    constructor(address _bitToken) {
        bitToken = IERC20(_bitToken);
        owner = msg.sender;
        adminWhitelist[msg.sender] = true;
        adminList.push(msg.sender);
    }

    // Admin management functions
    function addAdmin(address admin) external onlyOwner {
        require(admin != address(0), "Invalid address");
        require(!adminWhitelist[admin], "Already an admin");
        
        adminWhitelist[admin] = true;
        adminList.push(admin);
        
        emit AdminAdded(admin, block.timestamp);
    }

    function removeAdmin(address admin) external onlyOwner {
        require(admin != owner, "Cannot remove owner");
        require(adminWhitelist[admin], "Not an admin");
        
        adminWhitelist[admin] = false;
        
        // Remove from adminList
        for (uint256 i = 0; i < adminList.length; i++) {
            if (adminList[i] == admin) {
                adminList[i] = adminList[adminList.length - 1];
                adminList.pop();
                break;
            }
        }
        
        emit AdminRemoved(admin, block.timestamp);
    }

    function isAdmin(address addr) external view returns (bool) {
        return adminWhitelist[addr] || addr == owner;
    }

    function getAdminList() external view returns (address[] memory) {
        return adminList;
    }

    function listItem(
        string memory name,
        string memory description,
        uint256 price,
        uint256 stock,
        string memory category,
        string memory imageUrl
    ) external onlyAdmin {
        require(bytes(name).length > 0, "Name is required");
        require(price > 0, "Price must be greater than 0");
        require(stock > 0, "Stock must be greater than 0");

        items[nextItemId] = Item({
            id: nextItemId,
            name: name,
            description: description,
            price: price,
            merchant: msg.sender,
            stock: stock,
            active: true,
            category: category,
            imageUrl: imageUrl,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit ItemListed(nextItemId, name, price, msg.sender, stock, imageUrl, block.timestamp);
        nextItemId++;
    }

    function updateItem(
        uint256 itemId,
        uint256 price,
        uint256 stock,
        bool active,
        string memory imageUrl
    ) external onlyAdmin {
        Item storage item = items[itemId];
        require(item.createdAt > 0, "Item not found");
        require(item.merchant == msg.sender || msg.sender == owner, "Not item owner or admin");
        
        if (price > 0) item.price = price;
        item.stock = stock;
        item.active = active;
        if (bytes(imageUrl).length > 0) {
            item.imageUrl = imageUrl;
        }
        item.updatedAt = block.timestamp;

        emit ItemUpdated(itemId, item.price, stock, active, block.timestamp);
    }

    function exchangeItem(uint256 itemId) external {
        Item storage item = items[itemId];
        require(item.price > 0, "Item not found");
        require(item.active, "Item not active");
        require(item.stock > 0, "Out of stock");

        // Transfer BIT tokens from buyer to merchant
        require(
            bitToken.transferFrom(msg.sender, item.merchant, item.price),
            "Token transfer failed"
        );

        // Decrease stock
        item.stock--;
        totalExchanges++;
        totalVolumeTraded += item.price;

        // Record exchange
        Exchange memory newExchange = Exchange({
            buyer: msg.sender,
            itemId: itemId,
            price: item.price,
            timestamp: block.timestamp
        });

        itemExchanges[itemId].push(newExchange);
        userPurchases[msg.sender].push(itemId);

        emit ItemExchanged(
            msg.sender,
            itemId,
            item.name,
            item.price,
            item.merchant,
            block.timestamp
        );
    }

    function getItem(uint256 itemId) external view returns (Item memory) {
        return items[itemId];
    }

    function getItemExchanges(uint256 itemId) external view returns (Exchange[] memory) {
        return itemExchanges[itemId];
    }

    function getUserPurchases(address user) external view returns (uint256[] memory) {
        return userPurchases[user];
    }

    function getTotalItems() external view returns (uint256) {
        return nextItemId;
    }

    function getShopStats() external view returns (
        uint256 _totalItems,
        uint256 _totalExchanges,
        uint256 _totalVolumeTraded
    ) {
        return (nextItemId, totalExchanges, totalVolumeTraded);
    }

    // Get paginated items - efficient batch loading
    function getItemsPage(uint256 offset, uint256 limit) external view returns (Item[] memory) {
        uint256 end = offset + limit;
        if (end > nextItemId) {
            end = nextItemId;
        }
        uint256 length = end > offset ? end - offset : 0;
        
        Item[] memory result = new Item[](length);
        for (uint256 i = 0; i < length; i++) {
            result[i] = items[offset + i];
        }
        return result;
    }

    // Get all active items
    function getActiveItems() external view returns (Item[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (items[i].active && items[i].stock > 0) {
                activeCount++;
            }
        }
        
        Item[] memory result = new Item[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (items[i].active && items[i].stock > 0) {
                result[index] = items[i];
                index++;
            }
        }
        return result;
    }

    function getContractBalance() external view returns (uint256) {
        return bitToken.balanceOf(address(this));
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        adminWhitelist[newOwner] = true;
        adminList.push(newOwner);
        owner = newOwner;
    }
}
