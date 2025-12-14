// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BITAirdrop {
    address public owner;
    IERC20 public bitToken;
    
    // BIT token has 9 decimals
    uint256 public constant REWARD_PER_TASK = 250 * 10**9; // 250 BIT tokens
    uint256 public constant TOTAL_TASKS = 8;
    uint256 public constant TOTAL_REWARD = TOTAL_TASKS * REWARD_PER_TASK; // 2000 BIT tokens
    
    // Statistics for leaderboard
    uint256 public totalParticipants;
    uint256 public totalTasksCompleted;
    uint256 public totalAirdropsClaimed;
    uint256 public totalRewardsDistributed;
    
    struct UserProgress {
        uint256 completedTasks;
        uint256 firstTaskTimestamp;
        uint256 claimTimestamp;
        bool claimed;
    }
    
    // Track all participants for leaderboard
    address[] public participants;
    mapping(address => bool) public isParticipant;
    mapping(address => UserProgress) public userProgress;
    mapping(address => mapping(string => bool)) public taskCompleted;
    
    // Valid task IDs
    string[8] public validTaskIds = [
        "facebook-like",
        "twitter-follow", 
        "youtube-subscribe",
        "telegram-join",
        "facebook-review",
        "google-review",
        "trustpilot-review",
        "github-visit"
    ];
    
    event TaskCompleted(
        address indexed user, 
        string taskId, 
        uint256 completedCount,
        uint256 timestamp
    );
    
    event AirdropClaimed(
        address indexed user, 
        uint256 amount,
        uint256 timestamp
    );
    
    event ParticipantJoined(
        address indexed user, 
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    constructor(address _bitToken) {
        owner = msg.sender;
        bitToken = IERC20(_bitToken);
    }
    
    function isValidTaskId(string memory taskId) internal view returns (bool) {
        for (uint256 i = 0; i < validTaskIds.length; i++) {
            if (keccak256(bytes(taskId)) == keccak256(bytes(validTaskIds[i]))) {
                return true;
            }
        }
        return false;
    }
    
    function completeTask(string memory taskId) external {
        require(isValidTaskId(taskId), "Invalid task ID");
        require(!taskCompleted[msg.sender][taskId], "Task already completed");
        
        UserProgress storage progress = userProgress[msg.sender];
        require(!progress.claimed, "Already claimed airdrop");
        
        // Register new participant
        if (!isParticipant[msg.sender]) {
            isParticipant[msg.sender] = true;
            participants.push(msg.sender);
            totalParticipants++;
            progress.firstTaskTimestamp = block.timestamp;
            emit ParticipantJoined(msg.sender, block.timestamp);
        }
        
        taskCompleted[msg.sender][taskId] = true;
        progress.completedTasks++;
        totalTasksCompleted++;
        
        emit TaskCompleted(msg.sender, taskId, progress.completedTasks, block.timestamp);
    }
    
    function claimAirdrop() external {
        UserProgress storage progress = userProgress[msg.sender];
        require(progress.completedTasks == TOTAL_TASKS, "Complete all tasks first");
        require(!progress.claimed, "Already claimed");
        
        progress.claimed = true;
        progress.claimTimestamp = block.timestamp;
        totalAirdropsClaimed++;
        totalRewardsDistributed += TOTAL_REWARD;
        
        require(bitToken.transfer(msg.sender, TOTAL_REWARD), "Transfer failed");
        
        emit AirdropClaimed(msg.sender, TOTAL_REWARD, block.timestamp);
    }
    
    function getUserProgress(address user) external view returns (
        uint256 completedTasks,
        uint256 totalRewards,
        uint256 remainingUnclaimed,
        bool claimed,
        bool canClaim
    ) {
        UserProgress storage progress = userProgress[user];
        completedTasks = progress.completedTasks;
        totalRewards = progress.completedTasks * REWARD_PER_TASK;
        remainingUnclaimed = progress.claimed ? 0 : totalRewards;
        claimed = progress.claimed;
        canClaim = progress.completedTasks == TOTAL_TASKS && !progress.claimed;
    }
    
    function getUserFullProgress(address user) external view returns (
        uint256 completedTasks,
        uint256 totalRewards,
        uint256 remainingUnclaimed,
        bool claimed,
        bool canClaim,
        uint256 firstTaskTimestamp,
        uint256 claimTimestamp
    ) {
        UserProgress storage progress = userProgress[user];
        completedTasks = progress.completedTasks;
        totalRewards = progress.completedTasks * REWARD_PER_TASK;
        remainingUnclaimed = progress.claimed ? 0 : totalRewards;
        claimed = progress.claimed;
        canClaim = progress.completedTasks == TOTAL_TASKS && !progress.claimed;
        firstTaskTimestamp = progress.firstTaskTimestamp;
        claimTimestamp = progress.claimTimestamp;
    }
    
    function isTaskCompleted(address user, string memory taskId) external view returns (bool) {
        return taskCompleted[user][taskId];
    }
    
    function getTaskStatus(address user) external view returns (bool[8] memory) {
        bool[8] memory status;
        for (uint256 i = 0; i < validTaskIds.length; i++) {
            status[i] = taskCompleted[user][validTaskIds[i]];
        }
        return status;
    }
    
    function getValidTaskIds() external view returns (string[8] memory) {
        return validTaskIds;
    }
    
    // Leaderboard functions
    function getTotalParticipants() external view returns (uint256) {
        return totalParticipants;
    }
    
    function getParticipant(uint256 index) external view returns (address) {
        require(index < participants.length, "Index out of bounds");
        return participants[index];
    }
    
    function getLeaderboardStats() external view returns (
        uint256 _totalParticipants,
        uint256 _totalTasksCompleted,
        uint256 _totalAirdropsClaimed,
        uint256 _totalRewardsDistributed
    ) {
        return (totalParticipants, totalTasksCompleted, totalAirdropsClaimed, totalRewardsDistributed);
    }
    
    function getLeaderboardPage(uint256 offset, uint256 limit) external view returns (
        address[] memory addresses,
        uint256[] memory tasksCompleted,
        bool[] memory claimedStatus,
        uint256[] memory timestamps
    ) {
        uint256 end = offset + limit;
        if (end > participants.length) {
            end = participants.length;
        }
        uint256 length = end > offset ? end - offset : 0;
        
        addresses = new address[](length);
        tasksCompleted = new uint256[](length);
        claimedStatus = new bool[](length);
        timestamps = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            address user = participants[offset + i];
            addresses[i] = user;
            tasksCompleted[i] = userProgress[user].completedTasks;
            claimedStatus[i] = userProgress[user].claimed;
            timestamps[i] = userProgress[user].firstTaskTimestamp;
        }
    }
    
    function getContractBalance() external view returns (uint256) {
        return bitToken.balanceOf(address(this));
    }
    
    function getRewardConstants() external pure returns (
        uint256 rewardPerTask,
        uint256 totalTasks,
        uint256 totalReward
    ) {
        return (REWARD_PER_TASK, TOTAL_TASKS, TOTAL_REWARD);
    }
    
    // Owner functions
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(bitToken.transfer(owner, amount), "Transfer failed");
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
