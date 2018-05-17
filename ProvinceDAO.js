const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");
var provinceArray = require("./province_array");

class ProvinceDAO {
    constructor() {
        this.db = new Database();
    }

    async getAllProvinces() {
        // var sql = "SELECT p.id, p._name AS name FROM province p LIMIT 1000";
        // console.log('sql = ' + sql);
        // var result = null;
        // await this.db.query(sql).then(function(rows) {
        //     result = rows;
        // });
        // return result;

        return provinceArray;
    }

    async getProvince(id) {
        // var sql = "SELECT p.id, p._name AS name FROM province p WHERE id = " + id;
        // console.log('sql = ' + sql);
        // var result = null;
        // await this.db.query(sql).then(function(rows) {
        //     result = rows[0];
        // });
        // return result;

        for(var i = 0; i < provinceArray.length; i++) {
            if(provinceArray[i].id == id) return provinceArray[i];
        }
        return null;
    }
}

module.exports = ProvinceDAO;