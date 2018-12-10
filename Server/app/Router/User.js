var express = require("express")
var router = express.Router()
var User = require("../models/userModel")
// var Quize = require("../models/createQuizModel")
var bcrypt = require("bcrypt");
var mongoose = require("mongoose")
mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");



router.post("/createAdmin", (req, res) => {
    // console.log(req.body)
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then((success) => {
                            res.status(201).json({
                                message: "User Created"
                            })
                        }).catch((err) => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
})



router.post("/SignIn", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.status(401).json({
                    message: "Auth field"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        userId: "Auth field"
                    })
                    console.log(req.body.email)
                }
                if (result) {
                    console.log(result)
                    res.status(200).json({
                        message: "Login Successful",
                    })
                }
                // res.status(401).json({
                //     message:"Auth field"
                // })
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})





router.post("/createQuiz", (req, res) => {
    const quizSchema = mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        aboutQuiz: { type: Object, required: true },
        quizArr: { type: Object, required: true }
    })

    var collection = req.body.aboutQuiz.title.replace(/\s/g, '')
    var Quize = mongoose.model(collection, quizSchema)

    const quiz = new Quize({
        _id: new mongoose.Types.ObjectId(),
        aboutQuiz: req.body.aboutQuiz,
        quizArr: req.body.quizArr,
    })
    quiz.save((success) => {
        console.log("Quiz Created Successfuly");
    })
})

module.exports = router;
