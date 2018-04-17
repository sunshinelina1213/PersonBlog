const express = require('express');
const router = express.Router();
const controller = require('./menu.manager.controller');


router.get('/getMenuTop',controller.getMenuTop);
router.get('/getMenu',controller.getMenu);
router.get('/addMenu',controller.addMenu);
router.get('/deleteMenu',controller.deleteMenu);
router.get('/changeMenu',controller.changeMenu);
router.get('/searchMenu',controller.searchMenu);

module.exports = router;