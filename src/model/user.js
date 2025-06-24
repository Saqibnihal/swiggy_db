const Uuid = require('./constants/uuid');
class User extends Uuid {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Order = require("./orders");

    return {
      orders: {
        relation: Uuid.HasManyRelation,
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
