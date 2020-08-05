const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get('/getusers', (req,res)=>{
    User.find({}, function(err, users) {
        if(err) {
            res.send(err);
            return;
        }
        res.json(users);
    });
})

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        github: req.user.github,
        linkedin: req.user.linkedin,
        lastname: req.user.lastname,
        role: req.user.role,
        avatar: req.user.avatar,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true, user: user
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.put("/updateuser", (req, res) => {
    console.log(req.body, 'is the update user req')
    User.findByIdAndUpdate({ _id: req.body.id }, { avatar: req.body.avatar }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true, user: user
        });
    });
});

router.put("/updateProfile/:id", (req, res) => {
    User.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name, email: req.body.email, github: req.body.github, linkedin: req.body.linkedin }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true, user: user
        });
    });
  });


router.delete("/deleteuser/:id", (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
