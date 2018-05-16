const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class NhaTroDAO {
    constructor() {
        this.db = new Database();
    }

    async getNhaTros(province_id) {
        var sql = "SELECT d.id, d._name AS name, d._prefix AS prefix, d._province_id AS province_id FROM district d WHERE _province_id = " + province_id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }
}

module.exports = NhaTroDAO;