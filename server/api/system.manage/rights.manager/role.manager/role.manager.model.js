'use strict';

const mongoose = require("mongoose"),
Schema = mongoose.Schema,
schemaConfig = require("../../../../config/schema.config");

const roleSchema = new Schema(schemaConfig.role_model.cols);
var textSearch = require("mongoose-text-search");
roleSchema.plugin(textSearch);
roleSchema.index({
    ROLE_NAME : "text",    
    REMARK : "text",
    RIGHTS_KEY : "text"
}, {
    name: "best_match_index"
});

module.exports = mongoose.model(schemaConfig.role_model.name,roleSchema);