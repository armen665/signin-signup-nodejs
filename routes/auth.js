const express = require('express');
const jwt = require('jsonwebtoken');

const { users, accessTokenSecret } = require('../data');

const authRouter = express.Router();

function signIn(req, res, next) {
    const { username, password } = req.body;
    const user = users.find(user => { return user.username === username && user.password === password});

    if(user) {
        const accessToken = jwt.sign({ username: user.username}, accessTokenSecret);
        user.token = accessToken;
        res.json({ accessToken });
    }
}

function signUp(req, res, next) {
    const { username, password } = req.body;
    const user = users.find(user => { return user.username === username });
    if (!user) {
        users.push({
            username,
            password
        })
        res.status(201).send('User created successfully.');
    } else {
        res.send('Username already exists');
    }
}

authRouter
    .post('/signin', signIn)
    .post('/signup', signUp);

module.exports = authRouter;