const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GratitudeSchema = new Schema ({
    thought: String

});

module.exports = mongoose.model('gratitude', GratitudeSchema);