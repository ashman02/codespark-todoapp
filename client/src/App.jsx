import { useState, useEffect } from "react"
import {
  PlusCircle,
  Trash2,
  CheckCircle,
  Circle,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react"
import axiosInstance from "./utils/axiosInstance"

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [priority, setPriority] = useState("Low")
  const [loading, setLoading] = useState(true)
  const [isCreatingTodo, setIsCreatingTodo] = useState(false)
  const [error, setError] = useState(null)
  const [sortOrder, setSortOrder] = useState("asc")

  // Priority color mapping
  const priorityColors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  }

  // Priority values for sorting
  const priorityValues = {
    High: 3,
    Medium: 2,
    Low: 1,
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get("/api/todo/get-todos")
        setTodos(res.data.data)
      } catch (error) {
        setError(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsCreatingTodo(true)
    try {
      if (!newTodo) return
      const res = await axiosInstance.post("/api/todo/create-todo", {
        content: newTodo,
        priority,
      })
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          _id: res.data.data._id,
          content: newTodo,
          priority,
          isCompleted: false,
        },
      ])
      setNewTodo("")
      setPriority("Low")
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsCreatingTodo(false)
    }
  }

  const handleUpdate = async (id) => {
    try {
      if (!editContent) {
        handleDelete(id)
        return
      }
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, content: editContent } : todo
        )
      )
      setEditingId(null)
      await axiosInstance.patch(`/api/todo/update-todo/${id}`, {
        content: editContent,
      })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id))
      await axiosInstance.delete(`/api/todo/update-todo/${id}`)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  const toggleComplete = async (id, isCompleted) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: isCompleted } : todo
        )
      )
      await axiosInstance.patch(`/api/todo/update-todo/${id}`, {
        isCompleted,
      })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleTodoClick = (todo) => {
    if (editingId !== todo._id) {
      setEditingId(todo._id)
      setEditContent(todo.content)
    }
  }

  const sortTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const diff = priorityValues[b.priority] - priorityValues[a.priority]
      return sortOrder === "asc" ? diff : -diff
    })
    setTodos(sortedTodos)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">
          Task Master
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 w-full md:w-auto">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="w-full px-4 py-3 rounded-lg border border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-4 py-3 rounded-lg border border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white shadow-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm flex items-center gap-2 disabled:opacity-60"
                disabled={isCreatingTodo}
              >
                <PlusCircle className="w-5 h-5" />
                Add
              </button>
            </div>
          </div>
        </form>

        {/* Sort Button */}
        <button
          onClick={sortTodos}
          className="mb-4 px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-200 hover:bg-indigo-50 flex items-center gap-2"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort by Priority (
          {sortOrder === "asc" ? "Highest First" : "Lowest First"})
        </button>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-xl shadow-sm border border-indigo-50 p-4 transition-all hover:shadow-md cursor-text"
              onClick={() => handleTodoClick(todo)}
            >
              {editingId === todo._id ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1 w-full sm:w-auto px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-200"
                    autoFocus
                    onBlur={() => handleUpdate(todo._id)}
                  />
                  <button
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm flex items-center gap-2"
                    onClick={() => handleUpdate(todo._id)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-start justify-between md:items-center gap-4 ">
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleComplete(todo._id, !todo.isCompleted)
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {todo.isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        todo.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.content}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${
                        priorityColors[todo.priority]
                      } flex items-center gap-1`}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {todo.priority}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(todo._id)
                      }}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {todos.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
