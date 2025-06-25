const BaseModel = require("./constants/BaseModel");
const { uuidField, number,timestamps } = require("./constants/type");

class OrderStatusHistory extends BaseModel {
    static get tableName() {
        return 'orderStatusHistory'
    }
    $beforeInsert() {
        super.$beforeInsert();

        if (!this.changedAt) {
            this.changedAt = Date.now();
        }
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['orderId', 'statusId', 'changedBy', 'changedAt'],
            properties: {
                id: uuidField,
                orderId: uuidField,
                statusId: uuidField,
                changedBy: { type: 'string', enum: ['system', 'restaurant'] },
                changedAt: timestamps
            }
        }

    }

    static get relationMappings() {
        const OrderStatuses = require('./orderStatuses')
        const Orders = require('./orders')
        return {
            status: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: OrderStatuses,
                join: {
                    from: `${this.tableName}.statusId`,
                    to: `${OrderStatuses.tableName}.id`
                }
            },
            orders: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Orders,
                join: {
                    from: `${this.tableName}.orderId`,
                    to: `${Orders.tableName}.id`
                }
            }
        };

    }


}
module.exports = OrderStatusHistory;
