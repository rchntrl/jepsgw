/**
 Oper_ID	int
 DocNum	    varchar
 PaySumm	double
 DocDate	varchar
 OperDate	varchar
 TypeOper	tinyint
 NameOper	varchar
 Doc_ID	    varchar
 */
var orm = require("orm");
module.exports = function (db, cb) {
    db.settings.set("properties.primary_key", "Doc_ID");
    db.define("oper_reestr", {
        DocNum: String,
        DocDate: String,
        PaySumm: Number,
        OperDate: String,
        TypeOper: Number,
        NameOper: String,
        Oper_ID: Number
    }, {
        methods: {
        }
    });
    return cb();
};