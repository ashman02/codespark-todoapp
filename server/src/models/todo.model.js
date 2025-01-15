import mongoose,{Schema} from "mongoose";

const todoSchema = new Schema({
    content : {
        type : String,
        required : true,
        trim : true
    },
    isCompleted : {
        type : Boolean,
        default  : false
    },
    priority : {
        type : String,
        enum : ["High","Medium","Low"],
        default : "Low"
    }
}, {
    timestamps : true
})

const Todo = mongoose.model("Todo", todoSchema)
export default Todo