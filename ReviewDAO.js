const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");

class ReviewDAO {
	constructor() {
        this.db = new Database();
    }

	async getReview(hotel_id, user_id) {
        var sql = "SELECT r.id AS id, user_id, u.fullname AS user_name, hotel_id, review_point, comment, time" +
        	" FROM review r, user u WHERE r.user_id = u.id AND r.hotel_id = " + hotel_id + " AND user_id = " + user_id;

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows[0];
        });
        return result;
    }

	async getAllReviews(hotel_id, starts, nums) {
        var sql = "SELECT r.id AS id, user_id, u.fullname AS user_name, hotel_id, review_point, comment, time" +
            " FROM review r, user u WHERE user_id = u.id AND r.hotel_id = " + hotel_id +
            " ORDER BY time DESC" +
            " LIMIT " + starts + ", " + nums;

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;
    }

    async updateReview(hotel_id, user_id, input) {
        if(input.review_point == null && (input.comment == null || input.comment == "")) {
            return new ReturnMessage("fail", "You must specify content to update");
        }

        try {
            var sql = "UPDATE review SET ";
            for (var fieldString in input) {
                //Chỉ update những field mà người dùng nhập
                if (input[fieldString] != null && input[fieldString] != "") {
                    sql = sql + fieldString + " = '" + input[fieldString] + "',";
                }
            }
            sql = sql.substring(0, sql.length - 1);
            sql += " WHERE hotel_id = " + hotel_id + " AND user_id = " + user_id;
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc insert vào database xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }

    async deleteReview(hotel_id, user_id) {
        try {
            var sql = "DELETE FROM review WHERE hotel_id = " + hotel_id + " AND user_id = " + user_id;
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc delete xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }
}

module.exports = ReviewDAO;