'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = require('../../../../config/schema.config')

var RoleMenuSchema = new Schema(schema.role_menu_model.cols);

module.exports = mongoose.model(schema.role_menu_model.name, RoleMenuSchema);