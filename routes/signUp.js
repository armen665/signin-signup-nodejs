const express = require('express');
const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');

const router = express.Router();

router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(rootPath, 'views', 'signUp.html'));
})

router.post('/signup', (req, res, next) => {
    fs.readFile('./users.json', (err, data) => {
        if(err) {
            return;
        } 
        const users = JSON.parse(data.toString());
        isUserExists = false;
        users.forEach(el => {
            if(el.email === req.body.email) {
                isUserExists = true;
            }
        });
        if(!isUserExists) {
            users.push({
                email: req.body.email,
                pass: req.body.password
            });
            fs.writeFile('./users.json', JSON.stringify(users), err => {
                if (err) {
                    throw new Error(err);
                }
                console.log('File updated')
                res.redirect('/');
            })
        } else {
            console.log('User with this email already exists');
        }
        
    })

})


module.exports = router;