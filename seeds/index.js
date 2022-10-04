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
            image: 'https://placeimg.com/640/480/nature',
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

