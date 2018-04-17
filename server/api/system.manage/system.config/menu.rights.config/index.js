
'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./menu.rights.config.controller');

router.get('/getMenuRightsConfig',controller.getMenuRightsConfig);
router.get('/changeMenuRightsConfig',controller.changeMenuRightsConfig);
module.exports = router;
