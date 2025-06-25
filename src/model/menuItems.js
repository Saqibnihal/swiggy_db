const BaseModel = require("./constants/BaseModel");
class MenuItems extends BaseModel {
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
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Restaurants,
                join: {
                    from: `${this.tableName}.restaurantId`,
                    to: `${Restaurants.tableName}.id`
                }
            }
        }
    }

}
module.exports = MenuItems;