var orm = require("orm");
module.exports = function (db, cb) {
    db.settings.set("properties.primary_key", "UID");
    db.define("tblpayments", {
        Query_ID: String,
        SubscriberAccount: String,
        PaySum: Number, // FLOAT
        RN: Number,
        Status_ID: Number,
        DT: String,
        ProcessDT: Date
    }, {
        methods: {
            Status: function() {
                return this.Status_ID;
            }
        }
    });
    return cb();
};