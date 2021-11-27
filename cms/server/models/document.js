const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: {type: String},
    children: [{ any: Object }]
 });
 
 module.exports = mongoose.model('Document', documentSchema);
