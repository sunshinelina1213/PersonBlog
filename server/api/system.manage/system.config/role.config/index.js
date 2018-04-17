
'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./role.config.controller');

router.get('/getRoleConfig',controller.getRoleConfig);
router.get('/changeRoleConfig',controller.changeRoleConfig);
module.exports = router;
