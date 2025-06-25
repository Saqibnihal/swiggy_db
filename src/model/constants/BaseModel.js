const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");

class BaseModel extends Model {
    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4(); // call directly
        }
    }
}

module.exports = BaseModel;
