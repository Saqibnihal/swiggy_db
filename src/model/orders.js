const BaseModel = require("./constants/BaseModel");
const { uuidField, number, timestamps } = require("./constants/type");
class Order extends BaseModel {
  static get tableName() {
    return 'orders';
  }



  static get relationMappings() {
    const User = require('./user');
    const OrderStatusHistory = require('./orderStatusHistory');
    const Restaurant = require('./restaurant');
    const OrderStatus = require('./orderStatuses');

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.userId`,
          to: `${User.tableName}.id`
        }
      },
      orderStatusHistory: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderStatusHistory,
        join: {
          from: `${this.tableName}.id`,
          to: `${OrderStatusHistory.tableName}.orderId`
        }
      },
      restaurant: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: `${this.tableName}.restaurantId`,
          to: `${Restaurant.tableName}.id`
        }
      },
      orderStatus: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: OrderStatus,
        join: {
          from: `${this.tableName}.statusId`,
          to: `${OrderStatus.tableName}.id`
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ["userId", "restaurantId", "statusId", "totalAmount"],
      properties: {
        id: uuidField,
        userId: uuidField,
        restaurantId: uuidField,
        statusId: uuidField,
        totalAmount: number,
        created_at: timestamps,
        updated_at: timestamps,
      }
    }
  }
}


module.exports = Order;