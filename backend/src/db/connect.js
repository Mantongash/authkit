const mongoose = require("mongoose");
const connect = async () => {
    try {
        
        console.log("Attempting to connect to the database ...")
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    } catch (error) {
        console.log("Error connecting to DB", error.message)
    }
};

module.exports =  connect;
