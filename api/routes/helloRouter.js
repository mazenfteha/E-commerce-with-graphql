const express = require('express');
const router = express.Router();

const { helloFromRest } = require('../controllers/helloController')

router.get('/hello', helloFromRest)

module.exports = router