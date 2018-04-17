'use strict';

const mongoose = require("mongoose"),
Schema = mongoose.Schema,
schemaConfig = require("../../../../config/schema.config");

const departmentSchema = new Schema(schemaConfig.department_model.cols);
var textSearch = require("mongoose-text-search");
departmentSchema.plugin(textSearch);
departmentSchema.index({
    DEPARTMENT_NAME : "text",    
    DEPARTMENT_REMARK : "text",
    DEPARTMENT_KEY : "text"
}, {
    name: "best_match_index"
});

module.exports = mongoose.model(schemaConfig.department_model.name,departmentSchema);