const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// note this is just a shortcut so you don't have to type
// "mongoose.Schema a bunch of times later on when referencing relationships" like...
// mongoose.Schema.Types.somethingsomething. 

const CampgroundSchema = new Schema({
    title: String,
    height: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);

