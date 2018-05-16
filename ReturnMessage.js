/**
 * return messages when insert/update/delete from database
 */
class ReturnMessage {
    constructor(status, error) {
        this.status = status;
        this.error = error;
    }
}

module.exports = ReturnMessage;