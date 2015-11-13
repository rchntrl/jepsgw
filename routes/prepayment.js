var express = require('express');
var router = express.Router();
var PaymentFactory = require('.././modules/payment-module');
var dbConfig = require('.././config');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

for (var key in dbConfig) {
    (function(key) {
        router.get('/' + key + '/list', function(req, res, next) {
            var factory = new PaymentFactory(dbConfig[key]);
            factory.prepayment.handleRequest(req.query);
            factory.prepayment.result(function(rows) {
                if (req.xhr) {
                    res.json(rows);
                }
                res.render('payment-list', {
                    title: 'payment list',
                    query: factory.prepayment.query(),
                    payments: rows
                });
            });/**/
        });
    })(key);
}

module.exports = router;
