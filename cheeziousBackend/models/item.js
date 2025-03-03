const mongoose = require("mongoose")
const itemschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    categorize:{
        type: String,
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        require: true
    },

    status: String,
    imageUrl: {
        type: String
    },

});
const Item = mongoose.model("ITEM", itemschema);
module.exports = {
    Item
}