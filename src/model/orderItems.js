const Uuid = require('./constants/uuid');
class OrderItems extends Uuid {
    static get tableName() {
        return 'orderItems'
    }

    static get relationMappings() {

        const Order = require('./orders')
        const MenuItems = require('./menuItems');

        return {
            orders: {
                relation: Uuid.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'orderItems.orderId',
                    to: 'orders.id'
                }
            },
            menuItems: {
                relation: Uuid.BelongsToOneRelation,
                modelClass: MenuItems,
                join: {
                    from: 'orderItems.menuItemId',
                    to: 'menuItems.id'
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