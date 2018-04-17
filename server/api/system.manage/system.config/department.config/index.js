
'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./department.config.controller');

router.get('/getDepartmentConfig',controller.getDepartmentConfig);
router.get('/changeDepartmentConfig',controller.changeDepartmentConfig);
module.exports = router;
