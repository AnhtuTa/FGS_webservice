const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class UserDAO {
    constructor() {
        this.db = new Database();
    }

    async getUserByUsernameAndPass(username, encrypted_password) {
        var sql = "SELECT * FROM user WHERE username = '" + username + "' AND encrypted_password = '" + encrypted_password + "'";
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;
    }

    async getUserByUsername(username) {
        var sql = "SELECT * FROM user WHERE username = '" + username + "'";
        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;
    }
}

module.exports = UserDAO;