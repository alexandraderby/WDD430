const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
 });
 
 module.exports = mongoose.model('User', userSchema);

