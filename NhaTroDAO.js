const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class NhaTroDAO {
    constructor() {
        this.db = new Database();
    }

    async getNhaTros(nhatro_id) {
        var sql = "SELECT * FROM hotel WHERE id = " + nhatro_id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }

    async insertNhatro(input) {
        try {
            var sql = "INSERT INTO hotel(";
            for (var fieldString in input) {     //fieldString là 1 String, chứ ko phải field của input, do đó ko thể dùng: input.fieldString, mà phải dùng: input[fieldString]
                //Chỉ insert những field mà người dùng nhập
                if (input[fieldString] != null && input[fieldString] != "") {
                    sql = sql + fieldString + ",";
                }
            }
            sql += "type"
            sql = sql + ") VALUES(";
            for (var fieldString in input) {
                if (input[fieldString] != null && input[fieldString] != "") {
                    sql = sql + "'" + input[fieldString] + "',";
                }
            }
            sql += "'nhatro'";
            sql = sql + ")";
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc insert vào database xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }
}

module.exports = NhaTroDAO;