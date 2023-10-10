//connect to mongo db with mongoose
import mongoose from "mongoose";

export default async() => {
    return mongoose.connect(process.env.MONGO_URI, {
      
    });
} 