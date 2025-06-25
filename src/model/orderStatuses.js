const BaseModel = require("./constants/BaseModel");
class OrderStatuses extends BaseModel {
    static get tableName() {
        return 'orderStatuses'
    }

    static get relationMappings() {

        const Order = require('./orders')
        const orderStatusHistory = require('./orderStatusHistory');

        return {
            orders: {
                relation: BaseModel.HasManyRelation,
                modelClass: Order,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.statusId`
                }
            },
            orderStatusHistories: {
                relation: BaseModel.HasManyRelation,
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