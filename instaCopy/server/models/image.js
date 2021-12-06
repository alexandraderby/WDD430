const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    id: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
 });
 
 module.exports = mongoose.model('Image', imageSchema);

