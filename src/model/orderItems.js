const { Model } = require('objection')

class OrderItems extends Model {
    static get tableName() {
        return 'orderItems'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    static get relationMappings() {

        const Order = require('./orders')
        const MenuItems = require('');

        return {
            orders: {
                relation: Model.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'orderItems.orderId',
                    to: 'orders.id'
                }
            },
            menuItems: {
                relation: Model.ManyToManyRelation,
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
                id: { type: 'string', formar: 'uuid' },
                orderId: { type: 'string', formar: 'uuid' },
                menuItemId: { type: 'string', formar: 'uuid' },
                quantity: { type: 'number' },
                itemPrice: { type: 'number' },
                total: { type: 'number' },
            }
        }
    }
}


module.exports = OrderItems;