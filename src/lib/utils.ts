import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        const mongo = process.env.MONGO ?? "";
        const db = await mongoose.connect(mongo);
        isConnected = db.connections[0].readyState === mongoose.ConnectionStates.connected;
        console.log("Connected to the database");
    } catch (e) {
        console.error("Error connecting to the database:", e);
        throw new Error("Error connecting to the database");
    }
};
