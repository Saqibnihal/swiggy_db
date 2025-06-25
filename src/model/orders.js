const BaseModel = require('./constants/BaseModel');
const { uuidField, number, timestamps } = require('./constants/type');

class Order extends BaseModel {
  static get tableName() {
    return 'orders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'restaurantId', 'statusId', 'totalAmount'],
      properties: {
        id: uuidField,
        userId: uuidField,
        restaurantId: uuidField,
        statusId: uuidField,
        totalAmount: number,
        created_at: timestamps,
        updated_at: timestamps,
      },
    };
  }

  static get relationMappings() {
    const User = require('./user');
    const Restaurant = require('./restaurant');
    const OrderStatus = require('./orderStatuses');
    const OrderItems = require('./orderItems');
    const OrderStatusHistory = require('./orderStatusHistory');

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.userId',
          to: 'users.id',
        },
      },
      restaurant: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: 'orders.restaurantId',
          to: 'restaurants.id',
        },
      },
      orderStatus: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: OrderStatus,
        join: {
          from: 'orders.statusId',
          to: 'orderStatuses.id',
        },
      },
      orderItems: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderItems,
        join: {
          from: 'orders.id',
          to: 'orderItems.orderId',
        },
      },
      orderStatusHistory: {
        relation: BaseModel.HasManyRelation,
        modelClass: OrderStatusHistory,
        join: {
          from: 'orders.id',
          to: 'orderStatusHistory.orderId',
        },
      },
    };
  }
}

module.exports = Order;
