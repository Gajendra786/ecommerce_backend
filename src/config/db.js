const mongoose = require("mongoose")

const mongoDbUrl=''
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}