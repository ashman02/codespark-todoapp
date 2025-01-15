import express from "express";
import cors from "cors"

const app = express()
const allowedOrigins = ["http://localhost:5173"]
app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))

app.use(express.json({
    limit : "16kb"
}))

app.use(express.urlencoded({extended : true, limit : "16kb"}))

app.use(express.static("public"))

//routes 
import todoRoutes from "./routes/todo.routes.js"
app.use("/api/todo", todoRoutes)

export {app}