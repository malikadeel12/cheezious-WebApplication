const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        required: function () {  
            return !this.googleId;
        },
    },
    role: { 
        type: String,
        enum: ["admin", "user"], 
        default: "user", 
    },
    googleId: {
        type: String, 
        unique: true,
        sparse: true
    },
});
const User = mongoose.model("User", userschema);
module.exports = {
    User,
}
