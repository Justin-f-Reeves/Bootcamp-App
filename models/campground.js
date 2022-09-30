const mongoose = require('mongoose');
const { JoiCampgroundSchema } = require('../joiSchemas');
const review = require('./review');
const Schema = mongoose.Schema;
// note this is just a shortcut so you don't have to type
// "mongoose.Schema a bunch of times later on when referencing relationships" like...
// mongoose.Schema.Types.somethingsomething. 

const campgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Campground', campgroundSchema);

