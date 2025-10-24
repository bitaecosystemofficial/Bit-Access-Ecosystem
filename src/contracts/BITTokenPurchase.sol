// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title BITTokenPurchase
 * @dev Smart contract for purchasing BIT tokens with USDT/USDC
 */
contract BITTokenPurchase {
    address public owner;
    address public receiverWallet;
    address public bitToken;
    address public usdtToken;
    address public usdcToken;
    
    uint256 public pricePerBIT = 1080000000000000; // $0.00108 in wei (18 decimals)
    uint256 public minimumPurchase = 100000 * 10**18; // 100,000 BIT minimum
    
    bool public paused;
    
    event TokensPurchased(
        address indexed buyer,
        address indexed paymentToken,
        uint256 usdAmount,
        uint256 bitAmount,
        uint256 timestamp
    );
    
    event ReceiverWalletUpdated(address indexed oldWallet, address indexed newWallet);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    constructor(
        address _bitToken,
        address _usdtToken,
        address _usdcToken,
        address _receiverWallet
    ) {
        owner = msg.sender;
        bitToken = _bitToken;
        usdtToken = _usdtToken;
        usdcToken = _usdcToken;
        receiverWallet = _receiverWallet;
    }
    
    /**
     * @dev Purchase BIT tokens with USDT or USDC
     * @param paymentToken Address of payment token (USDT or USDC)
     * @param usdAmount Amount of USD to pay (in token decimals)
     */
    function purchaseBIT(address paymentToken, uint256 usdAmount) external whenNotPaused {
        require(
            paymentToken == usdtToken || paymentToken == usdcToken,
            "Invalid payment token"
        );
        require(usdAmount > 0, "Amount must be greater than 0");
        
        // Calculate BIT tokens to receive
        uint256 bitAmount = (usdAmount * 10**18) / pricePerBIT;
        
        require(bitAmount >= minimumPurchase, "Amount below minimum purchase");
        require(
            IERC20(bitToken).balanceOf(address(this)) >= bitAmount,
            "Insufficient BIT tokens in contract"
        );
        
        // Transfer USDT/USDC from buyer to receiver wallet
        require(
            IERC20(paymentToken).transferFrom(msg.sender, receiverWallet, usdAmount),
            "Payment transfer failed"
        );
        
        // Transfer BIT tokens to buyer
        require(
            IERC20(bitToken).transfer(msg.sender, bitAmount),
            "BIT transfer failed"
        );
        
        emit TokensPurchased(msg.sender, paymentToken, usdAmount, bitAmount, block.timestamp);
    }
    
    /**
     * @dev Calculate BIT tokens for given USD amount
     * @param usdAmount Amount in USD (with token decimals)
     * @return Amount of BIT tokens
     */
    function calculateBITAmount(uint256 usdAmount) external view returns (uint256) {
        return (usdAmount * 10**18) / pricePerBIT;
    }
    
    /**
     * @dev Update receiver wallet address
     * @param _newReceiver New receiver wallet address
     */
    function updateReceiverWallet(address _newReceiver) external onlyOwner {
        require(_newReceiver != address(0), "Invalid address");
        address oldWallet = receiverWallet;
        receiverWallet = _newReceiver;
        emit ReceiverWalletUpdated(oldWallet, _newReceiver);
    }
    
    /**
     * @dev Update BIT token price
     * @param _newPrice New price per BIT (in wei)
     */
    function updatePrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Price must be greater than 0");
        uint256 oldPrice = pricePerBIT;
        pricePerBIT = _newPrice;
        emit PriceUpdated(oldPrice, _newPrice);
    }
    
    /**
     * @dev Update minimum purchase amount
     * @param _newMinimum New minimum purchase (in BIT tokens with decimals)
     */
    function updateMinimumPurchase(uint256 _newMinimum) external onlyOwner {
        minimumPurchase = _newMinimum;
    }
    
    /**
     * @dev Pause/unpause the contract
     */
    function togglePause() external onlyOwner {
        paused = !paused;
    }
    
    /**
     * @dev Withdraw BIT tokens from contract
     * @param amount Amount to withdraw
     */
    function withdrawBIT(uint256 amount) external onlyOwner {
        require(
            IERC20(bitToken).transfer(owner, amount),
            "Withdrawal failed"
        );
    }
    
    /**
     * @dev Emergency withdrawal of any ERC20 token
     * @param token Token address
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        require(
            IERC20(token).transfer(owner, amount),
            "Emergency withdrawal failed"
        );
    }
}
