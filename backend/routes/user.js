import express from "express";
import User from "../model/user.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    bcrypt.hash(req.body.password, 10) // hash method takes 1) input we want hash/encrypt 2) the salting / salt (the longer the salt, the longer it will take to decrypt)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                // password: req.body.password  <--- This would be bad, as passwords are personal and should be shared
                password: hash
            });
            user.save().then(result => {
                res.status(201).json({
                    success: true,
                    data: result
                })
            }).catch((error) => {
                if (error === 11000) {
                    console.log('User already exists!');
                    res.status(500).json({
                        success: false,
                        data: 'User already exists!'
                    });
                } else {
                    console.log('Error saving...', error);
                    res.status(500).json({
                        success: false,
                        data: error
                    });
                }
            });
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    data: 'Could not find user'
                });
            }
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
        if (!result) {
            return res.status(401).json({
                success: false,
                data: 'password not found'
            });
        }

        const token = jwt.sign({email: req.body.email, userId: req.body.password},
            'secret_this_should_be_longer',
            {expiresIn: '1h'});
        res.status(200).json({
            success: true,
            token: token,
            expiresIn: 3600 // expires in 1 hour (seconds)
        });

    }).catch(err => {
        console.log(err);
    });
});

export default router;
