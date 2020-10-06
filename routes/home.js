const express = require('express');
const path = require('path');
const rootPath = require('../util/path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(rootPath, 'views', 'home.html'))
});

module.exports = router;
