const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds', { campgrounds, title: "All Campgrounds" });
}))
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new', { title: "New Campground" });
})

router.get('/:id', wrapAsync(async (req, res) => {
    var Id_error = 0
    var campground
    try {
        campground = await Campground.findById(req.params.id).populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        }).populate('author');
    }
    catch (err) {
        if (err.kind === 'ObjectId') Id_error = 1
    }

    if (!campground || Id_error == 1) {
        req.flash('error', 'Cannot find campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground, title: campground.title });
}))


router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    var Id_error = 0
    var campground
    try {
        campground = await Campground.findById(req.params.id);
    }
    catch (err) {
        if (err.kind === 'ObjectId') Id_error = 1
    }
    if (!campground || Id_error == 1) {
        req.flash('error', 'Cannot find campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground, title: `Update ${campground.title}` });
}))

router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(async (req, res) => {
    if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    req.flash('success', "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}))
router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted campground!");
    res.redirect('/campgrounds');
}))

module.exports = router;



