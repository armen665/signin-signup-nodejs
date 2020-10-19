const express = require('express')
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const { users, accessTokenSecret } = require('../data');

async function getUser(req, res, next) {
    res.send(users);
}

function updateUser(req, res) {
    const user = users.find(user => { return user.username === req.user.username });
    user.username = req.body.username;
    user.password = req.body.password;
    res.send(`User details updated successfully\n Username: ${user.username}\n Password: ${user.password}`);
}

usersRouter
    .get('/me', getUser)
    .put('/me', updateUser);

module.exports = usersRouter;
