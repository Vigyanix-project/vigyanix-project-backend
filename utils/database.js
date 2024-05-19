const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        await mongoose.set('strictQuery', true);
        console.log("Connected to DB")
    } catch(err) {
        console.log("DB ERROR - ", err)
    }

}

module.exports = connectDB;