const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
 });
 
 module.exports = mongoose.model('Comment', commentSchema);

