const BaseModel = require("./constants/BaseModel");
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
            required: ["userId", "restaurantId", "statusId","totalAmount"],
            properties: {
                id: { type: 'string', format: 'uuid' },
                userId: { type: 'string', format: 'uuid' },
                restaurantId: { type: 'string', format: 'uuid' },
                statusId: { type: 'string', format: 'uuid' },
                totalAmount: { type: 'number' },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
            }
        }
    }
}


module.exports = Order;