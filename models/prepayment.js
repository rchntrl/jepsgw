var orm = require("orm");
module.exports = function (db, cb) {
    db.settings.set("properties.primary_key", "pay_Id");
    db.define("prepaymentepay", {
        DocNum: String,
        DocDate: String,
        PaySumm: Number,
        OperDate: String
    }, {
        methods: {
        }
    });
    return cb();
};