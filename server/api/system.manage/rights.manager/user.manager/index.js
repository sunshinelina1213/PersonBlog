'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./user.manager.controller');

router.get('/getUser',controller.getUser);
router.get('/getUserPage',controller.getUserPage);
router.post('/addUser',controller.addUser);
router.get('/deleteUser',controller.deleteUser);
router.get('/changeUser',controller.changeUser);

module.exports = router;
