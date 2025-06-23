const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");

class User extends Model {
  static get tableName() {
    return "users";
  }

  $beforeInsert() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  static get relationMappings() {
    const Order = require("./orders");

    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: "users.id",
          to: "orders.userId",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "phone", "address"],
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        phone: {
          type: "string",
          pattern: "^[0-9]{10,15}$",
        },
        address: {
          type: "string",
          minLength: 5,
          maxLength: 300,
        },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}

module.exports = User;
