'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./system.config.controller');

router.get('/getSystemInfo',controller.getSystemInfo);

module.exports = router;
