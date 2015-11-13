var mysql = require('mysql');
var Query = function(config, tableName) {
    var connection = mysql.createConnection(config);
    var table;
    var queryPattern = 'SELECT %fields% FROM %table% %filter% %order% LIMIT %limit%';
    var queryString;
    var fields = '*';
    var limit = '20';
    var order = [];
    var filter = [];
    if (tableName) {
        table = tableName;
    }
    function query() {
        queryString = queryPattern
            .replace(/%fields%/, fields)
            .replace(/%table%/, table)
            .replace(/%filter%/, filter.length ? 'WHERE ' + filter.join(' AND') : '')
            .replace(/%order%/, order.length ? 'ORDER BY ' + order.join(', ') : '')
            .replace(/%limit%/, limit)
        ;
        return queryString;
    }
    return {
        query: query,
        table: function(name) {
            table = name;
        },
        fields: function(list) {
            if (typeof list == 'object') {
                fields = list.join(', ');
            } else if (typeof list == 'string') {
                fields = list;
            }
        },
        result: function(callback) {
            connection.query(query(), function(err, rows) {
                if (err) throw err;
                callback(rows);
            });
        },
        filter: function(field, value) {
            filter.push(field + ' = "' + value + '"');
            return this;
        },
        sort: function(field, flag) {
            if (!flag) {
                flag = 'ASC';
            }
            order.push(field + ' ' + flag + ' ');
            return this;
        },
        limit: function(offset) {
            if (!offset) {
                offset = ['20'];
            }
            limit = offset.length == 2 ? offset.join(', ') : offset[0];
            return this;
        },
        handleRequest: function(query) {
            var sortField = query.sort.length ? query.sort : null;
            var sortDir = query.sort.length ? query.sort : 'ASC';
            if (sortField) {
                this.sort(sortField, sortDir);
            }
            if (query.limit && /\d{1,},\d{1,}|\d{1,}/.exec(query.limit)) {
                this.limit(query.limit.split(','));
            }
        }
    }
};

module.exports = Query;