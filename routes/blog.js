const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = require('../middleware');
const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn } = require("../middleware");

// GET ALL POSTS
router.get('/', (req, res) => {
    Post.find({}, null, {sort: {updatedAt: -1}}, function(err, foundPosts) {
        if (err) {
            console.log(err);
        } else {
            
            res.render('blog/blog', {posts: foundPosts});
        }
    })
    

})

// CREATE POST
router.post('/', (req, res) => {
    let title = req.body.title;
    let post = req.body.post;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let numberOfPosts = 0;
    let newPost = {title: title, post: post, author: author, numberOfPosts: numberOfPosts};
    

    Post.create(newPost, function(err, newlyCreated) {
        if(err) {
            console.log(err);
            //req.flash('error', "That didn't work, please try again");
        } else {
            console.log(newlyCreated);
            //req.flash('success', 'New campground created');
            res.redirect('/admin');
        }
    })

})

// SHOW POST
router.get('/:id', (req, res) => {
        Post.findById(req.params.id, function(err, foundPost) {
            if(err || !foundPost) {
                console.log(err);
                //req.flash('error', err.message);
                return res.redirect('/blog');
            } else {
                res.render('blog/post', {post: foundPost});
            }
        })
    });

// EDIT
router.get('/:id/edit', isLoggedIn, (req, res) => {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.user);
            
            res.render('blog/edit', {post: foundPost});
        }
        
    });
    
})

// UPDATE POST
router.put('/:id', isLoggedIn, (req, res) => {

    Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedPost) {
        if (err) {
            console.log(err);
            res.redirect('/blog');
        } else {
            console.log(updatedPost)
            res.redirect('/blog/:id' );
        }
            }).exec(function (err, updatedPost) {
                
                console.log(updatedPost.updatedAt); // Should be approximately createdAt + 1 second
                console.log(updatedPost.createdAt < updatedPost.updatedAt); // true)
        });
    });




// DESTROY POST
router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, function(err, deletedPost) {
        if (err) {
            console.log(err);
            res.redirect('/admin');
        }
        res.redirect('/admin');
    })

})


module.exports = router;