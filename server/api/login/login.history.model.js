'use strict';

const mongoose = require("mongoose"),
Schema = mongoose.Schema,
schemaConfig = require("../../config/schema.config");

module.exports = mongoose.model(schemaConfig.login_history.name,schemaConfig.login_history.cols);