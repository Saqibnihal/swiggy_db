const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");


class OrderStatusHistory extends Model {
    static get tableName() {
        return 'orderStatusHistory'
    }
    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4();
        }
        if (!this.changedAt) {
            this.changedAt = Date.now();
        }
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['orderId', 'statusId', 'changedBy', 'changedAt'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                orderId: { type: 'string', format: 'uuid' },
                statusId: { type: 'string', format: 'uuid' },
                changedBy: { type: 'string', enum: ['system', 'restaurant'] },
                changedAt: { type: 'number' }
            }
        }

    }

    static get relationMappings() {
        const OrderStatuses = require('./orderStatuses')
        const Orders = require('./orders')
        return {
            status: {
                relation: Model.BelongsToOneRelation,
                modelClass: OrderStatuses,
                join: {
                    from: 'orderStatusHistory.statusId',
                    to: 'orderStatuses.id'
                }
            },
            orders: {
                relation: Model.BelongsToOneRelation,
                modelClass: Orders,
                join: {
                    from: 'orderStatusHistory.orderId',
                    to: 'orders.id'
                }
            }
        };

    }


}
module.exports = OrderStatusHistory;