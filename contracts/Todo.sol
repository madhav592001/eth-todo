pragma solidity ^0.5.16;

contract Todo {
    uint256 public taskCount = 0;

    struct Task{
        uint id; 
        string content ; 
        bool completed ; 
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("Madhav Shukla's todo list");
    }

    function createTask(string memory _content) public { 
        taskCount++ ; 
        tasks[taskCount] = Task(taskCount,_content,false) ; 
    }

}
