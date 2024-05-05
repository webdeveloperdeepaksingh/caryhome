import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Mongo connection successful.");
    } catch (error) {
        throw new Error("Error while connecting to MongoDB.");
    }
};

export default dbConnect;
