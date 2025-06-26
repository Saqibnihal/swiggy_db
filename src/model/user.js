const BaseModel = require("./constants/BaseModel");
const { uuidField, string, timestamps, phone, address } = require("./constants/type");
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
        phone: phone,
        address: address,
        created_at: timestamps,
        updated_at: timestamps,
      },
    };
  }
}

module.exports = User;
