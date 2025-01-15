import { Router } from "express"
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../controllers/todo.controller.js"
const router = Router()

router.route("/create-todo").post(createTodo)
router.route("/get-todos").get(getTodos)
router.route("/update-todo/:todoId").patch(editTodo).delete(deleteTodo)

export default router