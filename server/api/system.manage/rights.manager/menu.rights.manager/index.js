'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./menu.rights.manager.controller');

router.get('/getMenuRights',controller.getMenuRights);
router.get('/getMenuRightsPage',controller.getMenuRightsPage);
router.get('/setMenuRights',controller.setMenuRights);
router.get('/changeMenuRights',controller.changeMenuRights);


module.exports = router;
