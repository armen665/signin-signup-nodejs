const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/1', routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});