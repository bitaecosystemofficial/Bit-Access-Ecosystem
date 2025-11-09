// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BITAirdrop {
    address public owner;
    IERC20 public bitToken;
    uint256 public constant REWARD_PER_TASK = 250 * 10**18; // 250 BIT tokens
    uint256 public constant TOTAL_TASKS = 8;
    
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
    }
    
    mapping(address => UserProgress) public userProgress;
    mapping(address => mapping(string => bool)) public taskCompleted;
    
    event TaskCompleted(address indexed user, string taskId, uint256 completedCount);
    event AirdropClaimed(address indexed user, uint256 amount);
    
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
        
        taskCompleted[msg.sender][taskId] = true;
        progress.completedTasks++;
        
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
        
        emit TaskCompleted(msg.sender, taskId, progress.completedTasks);
    }
    
    function claimAirdrop() external {
        UserProgress storage progress = userProgress[msg.sender];
        require(progress.completedTasks == TOTAL_TASKS, "Complete all tasks first");
        require(!progress.claimed, "Already claimed");
        
        progress.claimed = true;
        uint256 reward = TOTAL_TASKS * REWARD_PER_TASK;
        
        require(bitToken.transfer(msg.sender, reward), "Transfer failed");
        
        emit AirdropClaimed(msg.sender, reward);
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
    
    function isTaskCompleted(address user, string memory taskId) external view returns (bool) {
        return taskCompleted[user][taskId];
    }
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(bitToken.transfer(owner, amount), "Transfer failed");
    }
}
