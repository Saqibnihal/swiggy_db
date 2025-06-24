const Uuid = require('./constants/uuid');

class Restaurant extends Uuid {
    static get tableName() {
        return 'restaurants'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'location', 'isOpen'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                location:{type:'string'},
                isOpen: { type: 'boolean' },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
            }
        }

    }

    static get relationMappings() {
        const MenuItem=require('./menuItems')
        const Order = require('./orders')
        return {
            menuItems: {
                relation: Uuid.HasManyRelation,
                modelClass: MenuItem,
                join: {
                    from: 'restaurants.id',
                    to: 'menuItems.restaurantId'
                }
            },
            orders: {
                relation: Uuid.HasManyRelation,
                modelClass: Order,
                join: {
                    from: 'restaurants.id',
                    to: 'orders.restaurantId'
                }
            }
        };

    }


}
module.exports = Restaurant;