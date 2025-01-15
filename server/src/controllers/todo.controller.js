import Todo from "../models/todo.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"

const createTodo = asyncHandler(async (req, res) => {
    try {
        const {content, priority = "Low"} = req.body
        if(!content){
            throw new ApiError(400, "Content is required")
        }
        const todo = await Todo.create({
            content,
            priority
        })

        return res.status(201).json(new ApiResponse(201, "Todo created successfully", todo))
    } catch (error) {
        console.log("Error while creating todo", error)
        throw new ApiError(500, "Something went wrong while creating todo")
    }
})

const editTodo = asyncHandler(async (req, res) => {
    try {
      const {content, priority, isCompleted} = req.body
      const {todoId} = req.params

      if(!content && !priority && !isCompleted){
        throw new ApiError(400, "At least one field is required")
      }

      const updatingObj = {}
      if(content) updatingObj.content = content
      if(priority) updatingObj.priority = priority
      if(isCompleted) updatingObj.isCompleted = isCompleted

      const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
        $set : updatingObj
      }, {
        new : true
      })

      if(!updatedTodo){
        throw new ApiError(404, "Todo not found")
      }

      return res.status(200).json(new ApiResponse(200, "Todo updated successfully"))

    } catch (error) {
        console.log("Error while updating todo", error)
        throw new ApiError(500, "Something went wrong while updating todo")
    }
})

const deleteTodo = asyncHandler(async (req, res) => {
    try {
        const {todoId} = req.params

        const todo = await Todo.findByIdAndDelete(todoId)

        if(!todo){
            throw new ApiError(404, "Todo not found")
        }

        return res.status(200).json(new ApiResponse(200, "Todo deleted successfully"))
    } catch (error) {
        console.log("Error while deleting todo", error)
        throw new ApiError(500, "Something went wrong while deleting todo")
    }
})

// we will get all the todos from the database and if we have to perform any filter we will do that in the frontend
const getTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({createdAt : -1})
        return res.status(200).json(new ApiResponse(200, "Todos fetched successfully", todos))
    } catch (error) {
        console.log("Error while fetching todos", error)
        throw new ApiError(500, "Something went wrong while fetching todos")
    }
})

export {createTodo, editTodo, deleteTodo, getTodos}