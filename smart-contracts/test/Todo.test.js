const { assert } = require("chai");

const Todo = artifacts.require("../contracts/Todo.sol") ; 

contract("Todo",(accounts)=>{
    before(async() => {
        this.todoList = await Todo.deployed()  ;
    })

    it("deploys successfully",async() => {
        const address = await this.todoList.address
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)
    })

    it("lists task",async()=>{
        const taskCount = await this.todoList.taskCount() 
        const task = await this.todoList.tasks(taskCount)
        assert.equal(task.id.toNumber(),taskCount.toNumber())
        assert.equal(task.content,"Madhav Shukla's todo list")
        assert.equal(task.completed,false) ; 
        assert.equal(taskCount.toNumber(),1)
    })

    it("creates task" , async() => {
        const result = await this.todoList.createTask("A new task")
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount,2)
        // console.log(result)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(),2)
        assert.equal(event.content,"A new task")
        assert.equal(event.completed,false)
    })

    it("completes task",async() => {
        const result = await this.todoList.taskCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed,true) 
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(),1)
        assert.equal(event.completed,true) 
    })
})