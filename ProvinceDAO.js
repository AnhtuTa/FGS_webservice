const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class ProvinceDAO {
    constructor() {
        this.db = new Database();
    }

    async getAllProvinces() {
        var sql = "SELECT p.id, p._name AS name FROM province p";
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }

    async getProvince(id) {
        var sql = "SELECT p.id, p._name AS name FROM province p WHERE id = " + id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;
    }
}

module.exports = ProvinceDAO;