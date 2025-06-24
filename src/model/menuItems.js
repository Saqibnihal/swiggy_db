const Uuid = require("./constants/uuid");
class MenuItems extends Uuid {
    static get tableName() {
        return 'menuItems'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'price', 'isAvailable'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                price: { type: 'number' },
                isAvailable: { type: 'boolean' },
                restaurantId: { type: 'string', format: 'uuid' },
                created_at: { type: "string", format: "date-time" },
                updated_at: { type: "string", format: "date-time" },
            }
        }

    }

    static get relationMappings() {
        const Restaurants = require('./restaurant')
        return {
            restaurants: {
                relation: Uuid.BelongsToOneRelation,
                modelClass: Restaurants,
                join: {
                    from: 'menuItems.restaurantId',
                    to: 'restaurants.id'
                }
            }
        }
    }

}
module.exports = MenuItems;