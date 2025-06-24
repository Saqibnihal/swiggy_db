const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");

class Uuid extends Model {
    $beforeInsert(context) {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
module.exports = Uuid;