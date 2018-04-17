
'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./menu.config.controller');

router.get('/getMenuConfig',controller.getMenuConfig);
router.get('/changeMenuConfig',controller.changeMenuConfig);
module.exports = router;
