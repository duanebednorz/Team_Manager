const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true,"What's the name of this item?"],
        minlength: [2,"Gotta have at least 2 letters"]
    },
    // Price: {
    //     type: Number,
    //     required: [true,"How much is this item"],
    //     min: [1,"Gotta be at least $1"]
    // },
    Position:{
        type: String,
        required: [true,"Describe this item"],
        minlength:[5,"Gotta be at least 5 characters"]
    },

}, {timestamps:true})

const Item = mongoose.model("Items", ItemSchema);

module.exports = Item;