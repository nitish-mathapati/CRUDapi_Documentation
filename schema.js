const mongoose = require("mongoose");

const grocery = new mongoose.Schema({
    item_name:{
        type: String,
        require: true
    },
    cost:{
        type: Number,
        require: true
    }

},

    {
        timestamps: true
    }

)

module.exports = mongoose.model("Customer",grocery)