const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class ObjectDAO {
    constructor() {
        this.db = new Database();
    }

    /**
     * Lấy 1 record trong database theo id
     * @param {String} tableName tên table
     * @param {Int} id id của record
     */
    async getObject(tableName, id) {
        var sql = "SELECT * FROM " + tableName + " WHERE id = " + id;
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;
    }

    /**
     * Insert 1 bản ghi vào database
     * @param {String} tabelName tên table cần insert
     * @param {JSON} input object chứa thông tin các field cần insert
     */
    async insertObject(tabelName, input) {
        try {
            var sql = "INSERT INTO " + tabelName + "(";

            for (var fieldString in input) {     //fieldString là 1 String, chứ ko phải field của input, do đó ko thể dùng: input.fieldString, mà phải dùng: input[fieldString]
                //Chỉ insert những field mà người dùng nhập
                if (input[fieldString] != null && input[fieldString] != "") {
                    sql = sql + fieldString + ",";
                }
            }
            sql = sql.substring(0, sql.length - 1);
            sql = sql + ") VALUES(";
            for (var fieldString in input) {
                if (input[fieldString] != null && input[fieldString] != "") {
                    var value = input[fieldString];
                    if(typeof value == "string") value = value.replace(/'/g, '\\\'');   //thay dấu ' bằng ký tự \' vì lệnh SQL dùng '' là dấu lưu String
                    sql = sql + "'" + value + "',";
                }
            }
            sql = sql.substring(0, sql.length - 1);
            sql = sql + ")";
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc insert vào database xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }
}

module.exports = ObjectDAO;