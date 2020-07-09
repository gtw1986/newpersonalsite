const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = require('../middleware');
const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn } = require("../middleware");
const { body, validationResult } = require('express-validator');



router.get('/', (req, res) => {
    console.log(req.headers);
    res.render('resume');
});

router.get('/resume', (req, res) => {
    console.log(req.headers);
    Post.find({}, (err, allPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('resume', {posts: allPosts});
        }
    })
    
})

router.get('/projects', (req, res) => {
    res.render('projects');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/admin", // Or other starting page after logging in
    
    failureRedirect: "/login",
    
  }), function(req, res){
    // Other code to run after logging in goes here.
  });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/admin', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    Post.find({}, null, {sort: {updatedAt: -1}}, function(err, foundPosts) {
        if (err) {
            console.log(err);
        } else {
            
            res.render('admin', {posts: foundPosts});
        }
    })
});


router.get('/register', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    res.render('register');
})

router.post('/register', middleware.isAdmin,
    [
        // username must be an email
        body('username').isLength({ min: 3 }).trim().escape(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 3 }).escape().trim(),
        body('email').isEmail().escape().trim()
      ], (req, res) => {// Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    let newUser = new User( { username: req.body.username, email: req.body.email });
 
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            //req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function() {
            //req.flash('success', 'Welcome, ' + user.username);
            res.redirect('/admin');
        })

    });
  }
    

})
module.exports = router;