const express = require('express');
const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');

const router = express.Router();

router.get('/signin', (req, res, next) => {
    res.sendFile(path.join(rootPath, 'views', 'signIn.html'));
})

router.post('/signin', (req, res, next) => {
    fs.readFile('./users.json', (err, data) => {
        if(err) {
            return;
        } 
        const users = JSON.parse(data.toString());
        isEmailCorrect = false;
        isPassCorrect = false;
        users.forEach(el => {
            if(el.email === req.body.email) {
                isEmailCorrect = true;
                if (el.pass === req.body.password) {
                    isPassCorrect = true
                }
            }
        });
        if(isEmailCorrect && isPassCorrect) {
            console.log('Signed in');
            res.redirect('/');
        } else {
            console.log('User login or password are incorrect');
        }
        
    })

})


module.exports = router;