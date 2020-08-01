const express = require('express');
const router = express.Router();
const  Post  = require("../models/Post");

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


router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
        res.json(updatedPost);
    });
});

module.exports = router;
