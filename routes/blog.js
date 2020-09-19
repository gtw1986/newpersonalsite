const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = require('../middleware');
const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn, isAdmin } = require("../middleware");
const multer  = require('multer')
const path = require('path');

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

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    /*limits: {
      fileSize: 2e+7 // 20MB This is the amount of bytes.
    }*/
  }).single('featuredImage');

  
// CREATE POST
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
          if(err.code = 'LIMIT_FILE_SIZE'){
              console.log(err);
           // req.flash('error', 'Sorry, that file is 20MB or larger, please choose a smaller size.');
          } else {
           // req.flash('error', err.message);
           console.log(err);
          }
          res.redirect('/admin');
        } else {
          if (!req.file){
              console.log(err);
            //req.flash('error', 'Please select a file to upload for your avatar.');
            res.redirect('/admin');
          } else {
            let featuredImage = req.file.filename;
            featuredImage = "uploads/" + featuredImage;
            let title = req.body.title;
            let post = req.body.post;
            let author = {
            id: req.user._id,
            username: req.user.username
            }
            let newPost = {title: title, post: post, author: author, featuredImage: featuredImage};
            
    Post.create(newPost,function(err, newlyCreated) {
        if(err) {
            console.log(err);
            //req.flash('error', "That didn't work, please try again");
        } else {
            console.log(newlyCreated);
            //req.flash('success', 'New campground created');
            res.redirect('/admin');
        }
    })
}
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
router.put('/:id', isLoggedIn, isAdmin, (req, res) => {
            
            Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedPost) {
                console.log(req.body);
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

// UPDATE IMAGE
router.put('/upload/:id', (req, res) => {
    upload(req, res, (err) => {
        if(err){
          if(err.code = 'LIMIT_FILE_SIZE'){
            console.log('Sorry, that file is 20MB or larger, please choose a smaller size.');
            res.redirect('/blog/:id/edit');
          } else {
            console.log('error', err.message);
            res.redirect('/blog/:id/edit');
          }
        } else {
          if (!req.file){
            console.log('Please select a file to upload.');
            res.redirect('/blog/:id/edit');
          } else {
            let featuredImage = req.file.filename;
            featuredImage = "uploads/" + featuredImage;
            console.log('before find ' + req.params.id );
            Post.findByIdAndUpdate(req.params.id, {featuredImage: featuredImage}, function (err, updatedPost) {
                if (err) {
                    res.redirect('/blog/:id/edit');
                } else {
                    res.redirect('/blog/:id' );
                }
                    })

}}})});

    




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