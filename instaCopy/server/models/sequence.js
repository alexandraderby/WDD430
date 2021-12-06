const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxUserId: { type: Number },
    maxLikeId: { type: Number },
    maxImageId: { type: Number },
    maxCommentId: { type: Number }

 });
 
 module.exports = mongoose.model('Sequence', sequenceSchema);
