var models = [
    'payment'
    ,'prepayment'
];
module.exports = function (db, cb) {
    function loadModels(id) {
        if (!id) {
            id = 0;
        }
        db.load("./" + models[id], function (err) {
            if (err) {
                return cb(err);
            }
            if (models[++id]) {
                loadModels(id);
            } else {
                return cb();
            }
        });
    }
    loadModels();
};
