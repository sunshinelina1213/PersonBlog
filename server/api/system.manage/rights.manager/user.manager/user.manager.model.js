'use strict';

const mongoose = require("mongoose"),
Schema = mongoose.Schema,
schemaConfig = require("../../../../config/schema.config");

const menuSchema = new Schema(schemaConfig.user_model.cols);

var textSearch = require("mongoose-text-search");
menuSchema.plugin(textSearch);
menuSchema.index({
    LOGIN_NAME : "text",    
    LOGIN_PASSWORD : "text",
    USER_XM : "text",
    USER_ZJHM : "text",
    DEPARTMENT_KEY : "text",
    RIGHTS_KEY : "text"
}, {
    name: "best_match_index"
});


module.exports = mongoose.model(schemaConfig.user_model.name,menuSchema);