const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log('Databse connected');
    } catch (error) {
        console.error('Database connection error',error);
    }
}

module.exports = connectDb