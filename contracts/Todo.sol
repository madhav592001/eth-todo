pragma solidity ^0.5.16;

contract Todo {
    uint256 public taskCount = 0;

    struct Task{
        uint id; 
        string content ; 
        bool completed ; 
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    ) ; 

    event TaskCompleted(uint id,bool completed);

    constructor() public {
        createTask("Madhav Shukla's todo list");
    }

    function createTask(string memory _content) public { 
        taskCount++ ; 
        tasks[taskCount] = Task(taskCount,_content,false) ; 
        emit TaskCreated(taskCount, _content, false);
    }

    function taskCompleted(uint _id) public { 
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed; 
        tasks[_id] = _task ; 

        emit TaskCompleted(_id,_task.completed);
    }

}
