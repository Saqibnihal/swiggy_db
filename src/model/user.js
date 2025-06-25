const BaseModel = require("./constants/BaseModel");
const { uuidField, string, timestamps } = require("./constants/type");
class User extends BaseModel {
  static get tableName() {
    return "users";
  }


  static get relationMappings() {
    const Order = require("./orders");

    return {
      orders: {
        relation: BaseModel.HasManyRelation,
        modelClass: Order,
        join: {
          from: `${this.tableName}.id"`,
          to: `${Order.tableName}.userId`,
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "phone", "address"],
      properties: {
        id: uuidField,
        name: string,
        phone: {
          type: "string",
          pattern: "^[0-9]{10,15}$",
        },
        address: {
          type: "string",
          minLength: 5,
          maxLength: 300,
        },
        created_at: timestamps,
        updated_at: timestamps,
      },
    };
  }
}

module.exports = User;
