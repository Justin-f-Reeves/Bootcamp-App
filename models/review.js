const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// note this is just a shortcut so you don't have to type
// "mongoose.Schema a bunch of times later on when referencing relationships" like...
// mongoose.Schema.Types.somethingsomething. 

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model('Review', reviewSchema);

