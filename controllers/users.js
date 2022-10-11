
const User = require('../models/user');


module.exports.getRegistrationForm = (req, res) => {
    res.render('users/registration');
}

module.exports.submitRegistrationData = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp');
            res.redirect('/campgrounds');
        })

    } catch (e) {
        if (e.code === 11000) {
            req.flash('error', `${e.keyValue.email} - this email is already registered.`)
        } else {
            req.flash('error', e.message)
        }
        res.redirect('/register')
    }
}

module.exports.getLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.submitLoginData = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Logged out!");
        res.redirect('/campgrounds');
    });
}
