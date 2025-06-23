const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");


class MenuItems extends Model {
    static get tableName() {
        return 'menuItems'
    }
    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'price', 'idAvailable'],
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
                relation: Model.BelongsToOneRelation,
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