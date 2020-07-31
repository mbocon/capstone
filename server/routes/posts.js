const express = require('express');
const router = express.Router();
const  Post  = require("../models/Post");
const { User } = require('../models/User');

const { auth } = require("../middleware/auth");

//=================================
//             POST
//=================================

router.get('/getposts', (req,res)=>{
    Post.find({}, function(err, posts) {
        if(err) {
            res.send(err);
            return;
        }
        res.json(posts);
    });
})

// router.get("/auth", auth, (req, res) => {
//     res.status(200).json({
//         _id: req.user._id,
//         isAdmin: req.user.role === 0 ? false : true,
//         isAuth: true,
//         email: req.user.email,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         role: req.user.role,
//         image: req.user.image,
//     });
// });

router.post("/create", (req, res) => {

    const post = new Post(req.body);

    post.save((err, item) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            post: post
        });
    });
});

router.delete('/:userId/:postId', (req,res) => {
    Post.findById(req.params.postId, function(err, post) {
        if(post.user.toString() === req.params.userId){
            post.remove()
            res.json('Delete success')
        } else{
            res.json('User unauthorized')
        }
    })
});




module.exports = router;
