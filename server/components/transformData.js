'use strict';

function transformData(config, datas) {
    let out = [];
    
    datas.forEach((data) => {
        let obj = {};
        for(let key in config) {
            if(data[key] || data[key] === "") {
                obj[config[key]] = data[key];
            }
        }
        out.push(obj);
    });
    return out;
}
module.exports = {
    transformData : transformData
}