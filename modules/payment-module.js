var SqlQuery = require('./sql-query');

function RequestBridgeForQuery(query) {
    var limit;
    var sortField = query.sort.length ? query.sort : null;
    var sortDir = query.sort.length ? query.sort : null;
    if (query.limit && /\d{1,},\d{1,}|\d{1,}/.exec(query.limit)) {
        limit = query.limit.split(',');
    }
    return {
        sort: function() {
            if (sortField) {
                return [sortField, sortDir ? sortDir : 'ASC'];
            }
            return null;
        },
        limit: function() {
            return limit.length == 2 ? limit[1] : limit[0];
        },
        offset: function() {
            return limit.length == 2 ? limit[0] : 0;
        }
    }
}

var PaymentNative = function(config) {
    var payment = new SqlQuery(config, 'tblpayments');
    payment.fields('UID, SubscriberAccount, Query_ID, RN, PackNum, PaySum, Status_ID, DT, ProcessDT, Description');

    var prepayment = new SqlQuery(config, 'prepaymentepay');
    payment.fields('pay_Id, DocNum, DocDate, PaySumm, OperDate');
    return {
        payment: payment,
        prepayment: prepayment
    }
};

var PaymentOrm = function(orm, config) {
    function ormDbConfig(config) {
        return config.user + ':' + config.password + '@' + config.host + '/' + config.database;
    }
    req.orm.connect("mysql://" + ormDbConfig(config), function (err, db) {
        if (err) throw err;
        db.load(".././models/models", function (err) {
            if (err) throw err;
            var payment = db.models.tblpayments;
            payment
                .find()
                .offset(0)
                .limit(10)
                .run(function(err, payments) {
                    if (err) throw err;
                    if (req.xhr) {
                        res.json(payments);
                    }
                    res.render('payment-list', {
                        title: 'payment list',
                        payments: payments
                    });
                })
            ;
        });

    });
};

module.exports = PaymentNative;