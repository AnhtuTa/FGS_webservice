const mysql = require('mysql');
const Database = require('./Database.js');
var ReturnMessage = require("./ReturnMessage");
var hotelArray = require("./hotel_array")

class HotelDAO {
    constructor() {
        this.db = new Database();
    }

    /**
     * Lấy nums bản ghi hotel từ vị trí start. Tương ứng với 1 trong 2 câu sql sau:
     * select ... from ... limit 4,5
     * select ... from ... limit 4  (biến nums ko chỉ rõ)
     */
    async getAllHotels(start, nums) {
        // var sql = "SELECT * FROM hotel LIMIT " + start;
        // if(nums) sql = sql + ", " + nums;
        // console.log('sql = ' + sql);
        // var result = null;
        // await this.db.query(sql).then(function(rows) {
        //     result = rows;
        // });
        // return result;

        var sid = start;
        if(sid >= hotelArray.length) return null;
        var eid = sid + nums - 1;
        if(eid >= hotelArray.length) eid = hotelArray.length - 1;

        var result = [];
        for(var i = sid; i <= eid; i++) {
            result.push(hotelArray[i]);
        }
        return result;
    }

    async getHotel(id) {
        // var sql = "SELECT * FROM hotel WHERE id = " + id;
        // console.log('sql = ' + sql);
        // var result = null;
        // await this.db.query(sql).then(function(rows) {
        //     result = rows[0];
        // });
        // return result;

        for(var i = 0; i < hotelArray.length; i++) {
            if(hotelArray[i].id == id) return hotelArray[i];
        }
        return null;
    }

    /**
     * Thêm 1 hotel vào database
     * @param input 1 object chứa giá trị các thuộc tính của hotel cần thêm.
     * Các thuộc tính này xem bên class hotel. Nếu ko chỉ rõ giá trị của 1 thuộc
     * tính nào đó thì thuộc tính đó khi insert vào database sẽ có giá trị null
     */
    async insertHotel(input) {
        try {
            var sql = "INSERT INTO hotel(";
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
                    sql = sql + "'" + input[fieldString] + "',";
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