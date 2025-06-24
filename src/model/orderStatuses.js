const Uuid = require('./constants/uuid');

class OrderStatuses extends Uuid {
    static get tableName() {
        return 'orderStatuses'
    }


    static get relationMappings() {

        const Order = require('./orders')
        const orderStatusHistory = require('./orderStatusHistory');

        return {
            orders: {
                relation: Uuid.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'orderStatuses.id',
                    to: 'orders.statusId'
                }
            },
            orderStatusHistories: {
                relation: Uuid.HasManyRelation,
                modelClass: orderStatusHistory,
                join: {
                    from: 'orderStatuses.id',
                    to: 'orderStatusHistory.statusId'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ["code", "label", "orderIndex"],
            properties: {
                id: { type: 'string', format: 'uuid' },
                code: { type: 'string' },
                label: { type: 'string' },
                orderIndex: { type: 'number' },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
            }
        }
    }
}


module.exports = OrderStatuses;