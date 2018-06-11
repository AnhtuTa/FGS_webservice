const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class PostDAO {
    constructor() {
        this.db = new Database();
    }

    /**
     * Hàm này giống hệt getHotels, do đó nếu sửa 1 chỗ phải sửa cả 2
     */
    async getPosts(start, nums, search_by, input, where, order_by) {
        var sql = "SELECT * FROM post WHERE " + search_by + " LIKE '%" + input + "%'";

        if(where) sql += " AND " + where;
        if(order_by) sql += " ORDER BY " + order_by;
        sql += " LIMIT " + start + ", " + nums;

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }

    async getPostsToApprove() {
        var sql = "SELECT * FROM post WHERE approved = 0 ORDER BY time ASC LIMIT 0, 5";

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }

    async countPostsToApprove() {
        var sql = "SELECT count(*) AS num_of_rows FROM post WHERE approved = 0";

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result.num_of_rows;
    }
}

module.exports = PostDAO;