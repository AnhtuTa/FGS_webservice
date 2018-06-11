const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");
var districtArray = require("./district_array");

class DistrictDAO {
    constructor() {
        this.db = new Database();
    }

    async getDistrict(id) {
        var sql = "SELECT d.id, d._name AS name, d._prefix AS prefix, d._province_id AS province_id FROM district d WHERE id = " + id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;

        // var result = [];
        // for(var i = 0; i < districtArray.length; i++) {
        //     if(districtArray[i].province_id == province_id) result.push(districtArray[i]);
        // }

        // return result;
    }

    async getDistricts(province_id) {
        var sql = "SELECT d.id, d._name AS name, d._prefix AS prefix, d._province_id AS province_id FROM district d WHERE _province_id = " + province_id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;

        // var result = [];
        // for(var i = 0; i < districtArray.length; i++) {
        //     if(districtArray[i].province_id == province_id) result.push(districtArray[i]);
        // }

        // return result;
    }

    async getAllDistricts() {
        var sql = "SELECT d.id, d._name AS name, d._prefix AS prefix, d._province_id AS province_id FROM district d LIMIT 1000";
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;

        // return districtArray;
    }
}

module.exports = DistrictDAO;