"user strict";
const express=require("express");
const router=express.Router();
const controller = require('./tubiao.index.controller.js');


router.get('/getTbIndex', controller.getTbIndex);

module.exports = router;
