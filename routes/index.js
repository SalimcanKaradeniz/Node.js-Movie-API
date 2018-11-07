const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('../app').bcrypt;
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

/* Anasayfa */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

router.post('/register', (req, res, next) => {
    const { username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password : hash,
        });

        const promise = user.save();

        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });
});

router.post('/authenticate', (req, res, next) => {
    const { username, password} = req.body;

    User.findOne({
        username,
    }, (err, user) => {
        if (err)
            throw err;

        if (!user){
            res.json({
                status: false,
                message: 'Aradığınız kullanıcı bulunamadı'
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if (!result){
                    res.json({
                        status: false,
                        message: 'Kullanıcı adı ya da parolanız yanlış lütfen kontrol ediniz!'
                    })
                }else{
                    const payload = {
                        username
                    };

                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 //12 saat eşittir
                    });

                    res.json({
                        status: true,
                        token
                    })
                }
            });
        }
    });

});

module.exports = router;
