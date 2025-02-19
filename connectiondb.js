const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/maindb").then(() => {
    console.log('Connected successfully to server')
}).catch((err) => {
    console.log("Connection Failed!!",err)
});