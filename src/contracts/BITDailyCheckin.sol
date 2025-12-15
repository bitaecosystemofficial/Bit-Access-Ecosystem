// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BITDailyCheckin
 * @dev Daily check-in contract for BIT ACCESS token rewards
 * Users can check in daily for 45 days, earning 200 BIT per check-in
 * No fees for claiming, only gas fees required
 */
contract BITDailyCheckin is Ownable, ReentrancyGuard {
    // BIT Token (9 decimals)
    IERC20 public immutable bitToken;
    
    // Constants
    uint256 public constant TOKEN_DECIMALS = 9;
    uint256 public constant REWARD_PER_CHECKIN = 200 * (10 ** TOKEN_DECIMALS); // 200 BIT per check-in
    uint256 public constant MAX_CHECKIN_DAYS = 45;
    uint256 public constant CHECKIN_COOLDOWN = 24 hours;
    
    // User check-in data
    struct UserCheckin {
        uint256 totalCheckins;          // Total number of check-ins completed
        uint256 lastCheckinTime;        // Timestamp of last check-in
        uint256 currentStreak;          // Current consecutive check-in streak
        uint256 longestStreak;          // Longest streak achieved
        uint256 totalRewardsClaimed;    // Total BIT rewards claimed
        bool[45] checkinDays;           // Track which days have been checked in
    }
    
    // Mapping of user address to their check-in data
    mapping(address => UserCheckin) public userCheckins;
    
    // Total stats
    uint256 public totalParticipants;
    uint256 public totalCheckinsCompleted;
    uint256 public totalRewardsDistributed;
    
    // Events
    event CheckinCompleted(
        address indexed user,
        uint256 dayNumber,
        uint256 reward,
        uint256 currentStreak,
        uint256 timestamp
    );
    event RewardClaimed(address indexed user, uint256 amount);
    event ContractFunded(address indexed funder, uint256 amount);
    
    constructor(address _bitToken) {
        require(_bitToken != address(0), "Invalid token address");
        bitToken = IERC20(_bitToken);
    }
    
    /**
     * @dev Perform daily check-in and claim reward
     * No fees, only gas required
     */
    function checkin() external nonReentrant {
        UserCheckin storage user = userCheckins[msg.sender];
        
        // Check if user is new participant
        if (user.totalCheckins == 0) {
            totalParticipants++;
        }
        
        // Validate check-in eligibility
        require(user.totalCheckins < MAX_CHECKIN_DAYS, "All 45 check-ins completed");
        require(
            block.timestamp >= user.lastCheckinTime + CHECKIN_COOLDOWN,
            "Must wait 24 hours between check-ins"
        );
        
        // Check contract has enough tokens
        require(
            bitToken.balanceOf(address(this)) >= REWARD_PER_CHECKIN,
            "Insufficient contract balance"
        );
        
        // Update streak
        if (user.lastCheckinTime > 0 && block.timestamp <= user.lastCheckinTime + 48 hours) {
            // Within 48 hours, continue streak
            user.currentStreak++;
        } else if (user.lastCheckinTime > 0) {
            // Streak broken, reset to 1
            user.currentStreak = 1;
        } else {
            // First check-in
            user.currentStreak = 1;
        }
        
        // Update longest streak
        if (user.currentStreak > user.longestStreak) {
            user.longestStreak = user.currentStreak;
        }
        
        // Mark day as checked in
        user.checkinDays[user.totalCheckins] = true;
        
        // Update user stats
        user.totalCheckins++;
        user.lastCheckinTime = block.timestamp;
        user.totalRewardsClaimed += REWARD_PER_CHECKIN;
        
        // Update global stats
        totalCheckinsCompleted++;
        totalRewardsDistributed += REWARD_PER_CHECKIN;
        
        // Transfer reward to user
        require(
            bitToken.transfer(msg.sender, REWARD_PER_CHECKIN),
            "Token transfer failed"
        );
        
        emit CheckinCompleted(
            msg.sender,
            user.totalCheckins,
            REWARD_PER_CHECKIN,
            user.currentStreak,
            block.timestamp
        );
        emit RewardClaimed(msg.sender, REWARD_PER_CHECKIN);
    }
    
    /**
     * @dev Get user's complete check-in status
     */
    function getUserStatus(address _user) external view returns (
        uint256 totalCheckins,
        uint256 lastCheckinTime,
        uint256 currentStreak,
        uint256 longestStreak,
        uint256 totalRewardsClaimed,
        uint256 remainingCheckins,
        uint256 nextCheckinTime,
        bool canCheckin
    ) {
        UserCheckin storage user = userCheckins[_user];
        
        totalCheckins = user.totalCheckins;
        lastCheckinTime = user.lastCheckinTime;
        currentStreak = user.currentStreak;
        longestStreak = user.longestStreak;
        totalRewardsClaimed = user.totalRewardsClaimed;
        remainingCheckins = MAX_CHECKIN_DAYS - user.totalCheckins;
        nextCheckinTime = user.lastCheckinTime + CHECKIN_COOLDOWN;
        canCheckin = (
            user.totalCheckins < MAX_CHECKIN_DAYS &&
            block.timestamp >= user.lastCheckinTime + CHECKIN_COOLDOWN
        );
    }
    
    /**
     * @dev Get user's check-in calendar (which days completed)
     */
    function getUserCheckinDays(address _user) external view returns (bool[45] memory) {
        return userCheckins[_user].checkinDays;
    }
    
    /**
     * @dev Get contract stats
     */
    function getContractStats() external view returns (
        uint256 _totalParticipants,
        uint256 _totalCheckinsCompleted,
        uint256 _totalRewardsDistributed,
        uint256 contractBalance,
        uint256 rewardPerCheckin,
        uint256 maxCheckinDays
    ) {
        return (
            totalParticipants,
            totalCheckinsCompleted,
            totalRewardsDistributed,
            bitToken.balanceOf(address(this)),
            REWARD_PER_CHECKIN,
            MAX_CHECKIN_DAYS
        );
    }
    
    /**
     * @dev Get reward constants
     */
    function getRewardConstants() external pure returns (
        uint256 rewardPerCheckin,
        uint256 maxDays,
        uint256 cooldownSeconds,
        uint256 decimals
    ) {
        return (
            REWARD_PER_CHECKIN,
            MAX_CHECKIN_DAYS,
            CHECKIN_COOLDOWN,
            TOKEN_DECIMALS
        );
    }
    
    /**
     * @dev Fund the contract with BIT tokens (owner only)
     */
    function fundContract(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            bitToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        emit ContractFunded(msg.sender, _amount);
    }
    
    /**
     * @dev Withdraw remaining tokens (owner only, emergency use)
     */
    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            bitToken.balanceOf(address(this)) >= _amount,
            "Insufficient balance"
        );
        require(
            bitToken.transfer(msg.sender, _amount),
            "Transfer failed"
        );
    }
}
