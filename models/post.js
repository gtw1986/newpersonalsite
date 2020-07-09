const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

 
const PostSchema = new Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    username: String,
},
    numberOfPosts: { type: Number, default: 0},
    
    title: String,
    post: String,
    image: String,

     
});

PostSchema.plugin(timestamps);

module.exports = mongoose.model("Post", PostSchema);