// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BITCommunityTasks
 * @dev Manages community task completion and rewards for BIT token ecosystem
 */
contract BITCommunityTasks {
    address public owner;
    
    struct Task {
        string taskId;
        uint256 reward;
        uint256 activationDate;
        bool isActive;
        string category; // 'check-in', 'social', 'events', 'webinar', 'forum'
    }
    
    struct UserTask {
        bool completed;
        uint256 completedAt;
        bool linkVisited;
        uint256 linkVisitedAt;
    }
    
    // Mapping: taskId => Task
    mapping(string => Task) public tasks;
    
    // Mapping: user => taskId => UserTask
    mapping(address => mapping(string => UserTask)) public userTasks;
    
    // Mapping: user => total completed tasks
    mapping(address => uint256) public userCompletedTasks;
    
    // Mapping: user => total rewards earned
    mapping(address => uint256) public userTotalRewards;
    
    // Mapping: user => check-in streak
    mapping(address => uint256) public userCheckInStreak;
    
    // Array of all task IDs
    string[] public taskIds;
    
    event TaskCreated(string taskId, uint256 reward, uint256 activationDate, string category);
    event TaskCompleted(address indexed user, string taskId, uint256 reward);
    event LinkVisited(address indexed user, string taskId, uint256 timestamp);
    event CheckInStreakUpdated(address indexed user, uint256 newStreak);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        
        // Initialize default tasks
        _createTask("daily-check", 100, 0, "check-in");
        _createTask("facebook-like", 250, 0, "social");
        _createTask("twitter-follow", 250, 0, "social");
        _createTask("youtube-subscribe", 250, 0, "social");
        _createTask("telegram-join", 250, 0, "social");
        _createTask("web3-seminar", 1000, block.timestamp + 7 days, "events");
        _createTask("daily-zoom", 250, block.timestamp + 3 days, "webinar");
        _createTask("webinar-invite", 5000, block.timestamp + 3 days, "webinar");
        _createTask("forum-attend", 2000, block.timestamp + 1 days, "forum");
        _createTask("forum-invite", 5000, block.timestamp + 1 days, "forum");
    }
    
    function _createTask(
        string memory _taskId,
        uint256 _reward,
        uint256 _activationDate,
        string memory _category
    ) internal {
        tasks[_taskId] = Task({
            taskId: _taskId,
            reward: _reward,
            activationDate: _activationDate,
            isActive: true,
            category: _category
        });
        taskIds.push(_taskId);
        
        emit TaskCreated(_taskId, _reward, _activationDate, _category);
    }
    
    function createTask(
        string memory _taskId,
        uint256 _reward,
        uint256 _activationDate,
        string memory _category
    ) external onlyOwner {
        _createTask(_taskId, _reward, _activationDate, _category);
    }
    
    function markLinkVisited(string memory _taskId) external {
        Task memory task = tasks[_taskId];
        require(task.isActive, "Task is not active");
        require(block.timestamp >= task.activationDate, "Task not yet active");
        require(!userTasks[msg.sender][_taskId].completed, "Task already completed");
        
        userTasks[msg.sender][_taskId].linkVisited = true;
        userTasks[msg.sender][_taskId].linkVisitedAt = block.timestamp;
        
        emit LinkVisited(msg.sender, _taskId, block.timestamp);
    }
    
    function completeTask(string memory _taskId) external {
        Task memory task = tasks[_taskId];
        require(task.isActive, "Task is not active");
        require(block.timestamp >= task.activationDate, "Task not yet active");
        require(!userTasks[msg.sender][_taskId].completed, "Task already completed");
        
        userTasks[msg.sender][_taskId].completed = true;
        userTasks[msg.sender][_taskId].completedAt = block.timestamp;
        
        userCompletedTasks[msg.sender]++;
        userTotalRewards[msg.sender] += task.reward;
        
        // Update check-in streak if it's a check-in task
        if (keccak256(bytes(task.category)) == keccak256(bytes("check-in"))) {
            userCheckInStreak[msg.sender]++;
            emit CheckInStreakUpdated(msg.sender, userCheckInStreak[msg.sender]);
        }
        
        emit TaskCompleted(msg.sender, _taskId, task.reward);
    }
    
    function isTaskCompleted(address _user, string memory _taskId) external view returns (bool) {
        return userTasks[_user][_taskId].completed;
    }
    
    function isLinkVisited(address _user, string memory _taskId) external view returns (bool) {
        return userTasks[_user][_taskId].linkVisited;
    }
    
    function getUserTaskInfo(address _user, string memory _taskId) 
        external 
        view 
        returns (bool completed, uint256 completedAt, bool linkVisited, uint256 linkVisitedAt) 
    {
        UserTask memory userTask = userTasks[_user][_taskId];
        return (
            userTask.completed,
            userTask.completedAt,
            userTask.linkVisited,
            userTask.linkVisitedAt
        );
    }
    
    function getTaskInfo(string memory _taskId) 
        external 
        view 
        returns (string memory taskId, uint256 reward, uint256 activationDate, bool isActive, string memory category) 
    {
        Task memory task = tasks[_taskId];
        return (
            task.taskId,
            task.reward,
            task.activationDate,
            task.isActive,
            task.category
        );
    }
    
    function getUserStats(address _user) 
        external 
        view 
        returns (uint256 completedTasks, uint256 totalRewards, uint256 checkInStreak) 
    {
        return (
            userCompletedTasks[_user],
            userTotalRewards[_user],
            userCheckInStreak[_user]
        );
    }
    
    function getAllTaskIds() external view returns (string[] memory) {
        return taskIds;
    }
    
    function setTaskActive(string memory _taskId, bool _isActive) external onlyOwner {
        tasks[_taskId].isActive = _isActive;
    }
    
    function updateTaskActivationDate(string memory _taskId, uint256 _newActivationDate) external onlyOwner {
        tasks[_taskId].activationDate = _newActivationDate;
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }
}
