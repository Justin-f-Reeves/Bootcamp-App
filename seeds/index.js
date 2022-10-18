const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30 + 10);
        const camp = new Campground({
            author: '6338f007099bfb0f5cf43db0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dasjozd14/image/upload/v1665709144/YelpCamp/rmcommhw6gkvmtlljozv.jpg',
                    filename: 'YelpCamp/rmcommhw6gkvmtlljozv'
                },
                {
                    url: 'https://res.cloudinary.com/dasjozd14/image/upload/v1665709145/YelpCamp/jkmoypzlti3cfn5xicai.jpg',
                    filename: 'YelpCamp/jkmoypzlti3cfn5xicai'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aspernatur dolor. Eligendi earum, similique eveniet nisi magnam a dolor impedit veniam non labore repellendus cumque sunt possimus ex iste molestias.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('connection closed');
})

