const { mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({
    roomName:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("Room", roomSchema);