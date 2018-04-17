'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./department.manager.controller');

router.get('/getDepartment',controller.getDepartment);
router.get('/getDepartmentPage',controller.getDepartmentPage);
router.get('/addDepartment',controller.addDepartment);
router.get('/deleteDepartment',controller.deleteDepartment);
router.get('/changeDepartment',controller.changeDepartment);


module.exports = router;
