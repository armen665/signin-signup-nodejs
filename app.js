const bodyParser = require('body-parser')
const express = require('express'); 
const path = require('path');

const signUpRoute = require('./routes/signUp');
const signInRoute = require('./routes/signIn');
const homeRoute = require('./routes/home');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(signUpRoute);
app.use(signInRoute);
app.use(homeRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
