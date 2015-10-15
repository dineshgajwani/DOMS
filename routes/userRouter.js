var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')
  .get(function (req, res) {
    res.render('index.ejs');
  });

router.route('/login')
  .get(function (req, res) {
    res.render('login.ejs', {message: req.flash('loginMessage')});
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get(function (req, res) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(isLoggedIn, function (req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

//Route manage drivers
router.route('/adminManageDrivers')
  .get(isLoggedIn, function (req, res) {
    res.render('adminManageDrivers.ejs', {
      user: req.user
    });
  });


router.route('/logout')
  .get(function (req, res) {
    req.logout();
    res.redirect('/');
  });

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
