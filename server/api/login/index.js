"user strict";
const express=require("express");
const router=express.Router();
const controller = require('./login.controller.js');


router.get('/doLogin', controller.doLogin);

module.exports = router;
