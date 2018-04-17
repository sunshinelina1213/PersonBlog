'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./role.manager.controller');

router.get('/getRole',controller.getRole);
router.get('/getRolePage',controller.getRolePage);
router.get('/addRole',controller.addRole);
router.get('/deleteRole',controller.deleteRole);
router.get('/changeRole',controller.changeRole);


module.exports = router;
