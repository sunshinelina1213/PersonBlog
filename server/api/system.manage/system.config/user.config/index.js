
'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./user.config.controller');

router.get('/getUserConfig',controller.getUserConfig);
router.get('/changeUserConfig',controller.changeUserConfig);

module.exports = router;
