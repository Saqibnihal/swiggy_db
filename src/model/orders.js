const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  $beforeInsert() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  static get relationMappings() {
    const User = require('./user');
    const OrderStatusHistory = require('./orderStatusHistory');
    const Restaurant = require('./restaurant');
    const OrderStatus = require('./orderStatuses');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.userId`,
          to: `${User.tableName}.id`
        }
      },
      orderStatusHistory: {
        relation: Model.HasManyRelation,
        modelClass: OrderStatusHistory,
        join: {
          from: `${this.tableName}.id`,
          to: `${OrderStatusHistory.tableName}.orderId`
        }
      },
      restaurant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: `${this.tableName}.restaurantId`,
          to: `${Restaurant.tableName}.id`
        }
      },
      orderStatus: {
        relation: Model.BelongsToOneRelation,
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