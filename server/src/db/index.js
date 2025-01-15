import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/todoapp`)
        console.log(`\n Mongo DB connected !! DB Host :  ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongo DB connection error", error);
        process.exit(1)
    }
}

export default connectDB