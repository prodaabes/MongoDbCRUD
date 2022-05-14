const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: { type: String },
    profilePic: { type: String },
    image: { type: String },
    time: { type: Date }
});

module.exports = mongoose.model('Post', postSchema);