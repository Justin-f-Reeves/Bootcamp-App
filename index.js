const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');
// for now we'll just hardcode this URL in (default port for Mongoose)
// eventually this is going to have some logic in here that says - 
// "use our local development database" or, if this is in production, then
// "use the production database"
// note that all those options in there are just boilerplate stuff

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// just some logic to check if there's an error with the connection to the database,
// and if there isn't then to show that it's connected.



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'cheap camping' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('serving on port 3000!');
})





