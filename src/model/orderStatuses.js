const BaseModel = require("./constants/BaseModel");
const { uuidField, string, number, timestamps } = require("./constants/type");
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
                id: uuidField,
                code: string,
                label: string,
                orderIndex: number,
                created_at: timestamps,
                updated_at: timestamps,
            }
        }
    }
}


module.exports = OrderStatuses;