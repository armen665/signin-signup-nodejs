const crypto = require('crypto');
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
        let iv =Buffer.alloc(16, 0);
        let key = crypto.scryptSync(req.body.password, 'salt', 24)
        users.forEach(el => {
            var mykey = crypto.createDecipher('aes-128-cbc', key, iv);
            var decrPass = mykey.update(el.pass, 'hex', 'utf8')
            decrPass += mykey.final('utf8');

            console.log(decrPass);

            if(el.email === req.body.email) {
                isEmailCorrect = true;
                if (decrPass === req.body.password) {
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