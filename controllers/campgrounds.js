
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { campgroundSchema } = require('../joiSchemas');
const ExpressError = require('../utils/ExpressError');


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds', { campgrounds, title: "All Campgrounds" });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new', { title: "New Campground" });
}

module.exports.createNewCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
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
}

module.exports.renderEditForm = async (req, res) => {
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
}

module.exports.editCampground = async (req, res) => {
    if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
    req.flash('success', "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted campground!");
    res.redirect('/campgrounds');
}