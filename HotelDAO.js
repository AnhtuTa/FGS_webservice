const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");
var hotelArray = require("./hotel_array");

class HotelDAO {
    constructor() {
        this.db = new Database();
    }

    /**
     * Lấy nums bản ghi hotel từ vị trí start. Tương ứng với 1 trong 2 câu sql sau:
     * select ... from ... limit 4,5
     * select ... from ... limit 4  (biến nums ko chỉ rõ)
     */
    async getHotels(start, nums, search_by, input, where, order_by) {
        var sql = "SELECT * FROM hotel WHERE " + search_by + " LIKE '%" + input + "%'";

        if(where) sql += " AND " + where;
        if(order_by) sql += " ORDER BY " + order_by;
        sql += " LIMIT " + start + ", " + nums;

        console.log('sql = ' + sql);
        var result = null;
        await this.db.query(sql).then(function(rows) {
            result = rows;
        });
        return result;

        // var sid = start;
        // if(sid >= hotelArray.length) return null;
        // var eid = sid + nums - 1;
        // if(eid >= hotelArray.length) eid = hotelArray.length - 1;

        // var result = [];
        // for(var i = sid; i <= eid; i++) {
        //     result.push(hotelArray[i]);
        // }
        // return result;
    }

    async updateHotel(id, input) {
        try {
            var sql = "UPDATE hotel SET ";
            for (var fieldString in input) {
                //Chỉ update những field mà người dùng nhập
                if (input[fieldString] != null && input[fieldString] != "") {
                    sql = sql + fieldString + " = '" + input[fieldString] + "',";
                }
            }
            sql = sql.substring(0, sql.length - 1);
            sql += " WHERE id = " + id;
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc insert vào database xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }

    async deleteHotel(id) {
        try {
            var sql = "DELETE FROM hotel WHERE id = " + id;
            console.log('sql = ' + sql);

            await this.db.query(sql);   //đợi cho việc insert vào database xong thì mới return kq
            
            return new ReturnMessage("success", null);
        } catch (error) {
            return new ReturnMessage("fail", error.toString());
        }
    }
}

module.exports = HotelDAO;