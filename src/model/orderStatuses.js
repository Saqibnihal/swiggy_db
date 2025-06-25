const { Model } = require('objection')

class OrderStatuses extends Model {
    static get tableName() {
        return 'orderStatuses'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    static get relationMappings() {

        const Order = require('./orders')
        const orderStatusHistory = require('./orderStatusHistory');

        return {
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.statusId`
                }
            },
            orderStatusHistories: {
                relation: Model.HasManyRelation,
                modelClass: orderStatusHistory,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${orderStatusHistory.tableName}.statusId`
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