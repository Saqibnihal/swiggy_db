const BaseModel = require("./constants/BaseModel");
class OrderItems extends BaseModel {
    static get tableName() {
        return 'orderItems'
    }

    static get relationMappings() {

        const Order = require('./orders')
        const MenuItems = require('./menuItems');

        return {
            orders: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: `${this.tableName}.orderId`,
                    to: `${Order.tableName}.id`
                }
            },
            menuItems: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: MenuItems,
                join: {
                    from: `${this.tableName}.menuItemId`,
                    to: `${MenuItems.tableName}.id`
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ["orderId", "menuItemId", "quantity", "itemPrice", "total"],
            properties: {
                id: { type: 'string', format: 'uuid' },
                orderId: { type: 'string', format: 'uuid' },
                menuItemId: { type: 'string', format: 'uuid' },
                quantity: { type: 'number' },
                itemPrice: { type: 'number' },
                total: { type: 'number' },
            }
        }
    }
}


module.exports = OrderItems;