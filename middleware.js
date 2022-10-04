const { campgroundSchema, reviewSchema } = require('./joiSchemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'you need to be logged to do that');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    var Id_error = 0
    var campground
    try {
        campground = await Campground.findById(id);
    }
    catch (err) {
        if (err.kind === 'ObjectId') Id_error = 1
    }
    if (!campground || Id_error == 1) {
        req.flash('error', 'Cannot find campground!')
        return res.redirect('/campgrounds')
    }
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', "You don't have permission to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    var Id_error = 0
    var review
    try {
        review = await Review.findById(reviewId);
    }
    catch (err) {
        if (err.kind === 'ObjectId') Id_error = 1
    }
    if (!review || Id_error == 1) {
        req.flash('error', 'Cannot find review!')
        return res.redirect('/campgrounds')
    }
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You don't have permission to do that!");
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}





