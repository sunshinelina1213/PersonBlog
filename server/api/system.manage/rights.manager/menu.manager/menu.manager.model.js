'use strict';

const mongoose = require("mongoose"),
Schema = mongoose.Schema,
schemaConfig = require("../../../../config/schema.config");

const menuSchema = new Schema(schemaConfig.menu_model.cols);

module.exports = mongoose.model(schemaConfig.menu_model.name,menuSchema);