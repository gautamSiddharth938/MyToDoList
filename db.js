const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/TodoList?directConnection=true&readPreference=primary"
// const mongoURI = "mongodb://127.0.0.1/test-db?directConnection=true&readPreference=primary"

// const uri = process.env.mongoURI
const connecttoMongo = async () => {
    await mongoose.connect(mongoURI )
    console.log("Connected to mongoose sucessfully.");
}
module.exports = connecttoMongo