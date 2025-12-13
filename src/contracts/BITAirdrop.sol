// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BITAirdrop {
    address public owner;
    IERC20 public bitToken;
    uint256 public constant REWARD_PER_TASK = 250 * 10**18; // 250 BIT tokens
    uint256 public constant TOTAL_TASKS = 8;
    
    // Statistics for leaderboard
    uint256 public totalParticipants;
    uint256 public totalTasksCompleted;
    uint256 public totalAirdropsClaimed;
    uint256 public totalRewardsDistributed;
    
    struct UserProgress {
        bool facebookLike;
        bool twitterFollow;
        bool youtubeSubscribe;
        bool telegramJoin;
        bool facebookReview;
        bool googleReview;
        bool trustpilotReview;
        bool githubVisit;
        bool claimed;
        uint256 completedTasks;
        uint256 firstTaskTimestamp;
        uint256 claimTimestamp;
    }
    
    // Track all participants for leaderboard
    address[] public participants;
    mapping(address => bool) public isParticipant;
    mapping(address => UserProgress) public userProgress;
    mapping(address => mapping(string => bool)) public taskCompleted;
    
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
    event ParticipantJoined(address indexed user, uint256 timestamp);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    constructor(address _bitToken) {
        owner = msg.sender;
        bitToken = IERC20(_bitToken);
    }
    
    function completeTask(string memory taskId) external {
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
        
        // Update specific task flags
        if (keccak256(bytes(taskId)) == keccak256(bytes("facebook-like"))) {
            progress.facebookLike = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("twitter-follow"))) {
            progress.twitterFollow = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("youtube-subscribe"))) {
            progress.youtubeSubscribe = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("telegram-join"))) {
            progress.telegramJoin = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("facebook-review"))) {
            progress.facebookReview = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("google-review"))) {
            progress.googleReview = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("trustpilot-review"))) {
            progress.trustpilotReview = true;
        } else if (keccak256(bytes(taskId)) == keccak256(bytes("github-visit"))) {
            progress.githubVisit = true;
        }
        
        emit TaskCompleted(msg.sender, taskId, progress.completedTasks, block.timestamp);
    }
    
    function claimAirdrop() external {
        UserProgress storage progress = userProgress[msg.sender];
        require(progress.completedTasks == TOTAL_TASKS, "Complete all tasks first");
        require(!progress.claimed, "Already claimed");
        
        progress.claimed = true;
        progress.claimTimestamp = block.timestamp;
        totalAirdropsClaimed++;
        
        uint256 reward = TOTAL_TASKS * REWARD_PER_TASK;
        totalRewardsDistributed += reward;
        
        require(bitToken.transfer(msg.sender, reward), "Transfer failed");
        
        emit AirdropClaimed(msg.sender, reward, block.timestamp);
    }
    
    function getUserProgress(address user) external view returns (
        uint256 completedTasks,
        uint256 totalRewards,
        uint256 remainingUnclaimed,
        bool claimed,
        bool canClaim
    ) {
        UserProgress memory progress = userProgress[user];
        completedTasks = progress.completedTasks;
        totalRewards = progress.completedTasks * REWARD_PER_TASK;
        remainingUnclaimed = progress.claimed ? 0 : (TOTAL_TASKS - progress.completedTasks) * REWARD_PER_TASK;
        claimed = progress.claimed;
        canClaim = progress.completedTasks == TOTAL_TASKS && !progress.claimed;
    }
    
    function getUserFullProgress(address user) external view returns (
        uint256 completedTasks,
        uint256 totalRewards,
        bool claimed,
        uint256 firstTaskTimestamp,
        uint256 claimTimestamp,
        bool facebookLike,
        bool twitterFollow,
        bool youtubeSubscribe,
        bool telegramJoin,
        bool facebookReview,
        bool googleReview,
        bool trustpilotReview,
        bool githubVisit
    ) {
        UserProgress memory progress = userProgress[user];
        return (
            progress.completedTasks,
            progress.completedTasks * REWARD_PER_TASK,
            progress.claimed,
            progress.firstTaskTimestamp,
            progress.claimTimestamp,
            progress.facebookLike,
            progress.twitterFollow,
            progress.youtubeSubscribe,
            progress.telegramJoin,
            progress.facebookReview,
            progress.googleReview,
            progress.trustpilotReview,
            progress.githubVisit
        );
    }
    
    function isTaskCompleted(address user, string memory taskId) external view returns (bool) {
        return taskCompleted[user][taskId];
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
        return (
            totalParticipants,
            totalTasksCompleted,
            totalAirdropsClaimed,
            totalRewardsDistributed
        );
    }
    
    // Get paginated leaderboard data
    function getLeaderboardPage(uint256 offset, uint256 limit) external view returns (
        address[] memory addresses,
        uint256[] memory tasksCompleted,
        uint256[] memory rewards,
        bool[] memory claimed,
        uint256[] memory timestamps
    ) {
        uint256 end = offset + limit;
        if (end > participants.length) {
            end = participants.length;
        }
        uint256 length = end > offset ? end - offset : 0;
        
        addresses = new address[](length);
        tasksCompleted = new uint256[](length);
        rewards = new uint256[](length);
        claimed = new bool[](length);
        timestamps = new uint256[](length);
        
        for (uint256 i = 0; i < length; i++) {
            address participant = participants[offset + i];
            UserProgress memory progress = userProgress[participant];
            
            addresses[i] = participant;
            tasksCompleted[i] = progress.completedTasks;
            rewards[i] = progress.completedTasks * REWARD_PER_TASK;
            claimed[i] = progress.claimed;
            timestamps[i] = progress.claimed ? progress.claimTimestamp : progress.firstTaskTimestamp;
        }
    }
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(bitToken.transfer(owner, amount), "Transfer failed");
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
