const Uuid = require('./constants/uuid');
class Order extends Uuid {
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
        relation: Uuid.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.userId',
          to: 'users.id'
        }
      },
      orderStatusHistory: {
        relation: Uuid.HasManyRelation,
        modelClass: OrderStatusHistory,
        join: {
          from: 'orders.id',
          to: 'orderStatusHistory.orderId'
        }
      },
      restaurant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: 'orders.restaurantId',
          to: 'restaurant.id'
        }
      },
      orderStatus: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderStatus,
        join: {
          from: 'orders.statusId',
          to: 'orderStatuses.id'
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