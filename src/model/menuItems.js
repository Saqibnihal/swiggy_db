const BaseModel = require("./constants/BaseModel");
const { uuidField, string, timestamps, number } = require("./constants/type");
class MenuItems extends BaseModel {
    static get tableName() {
        return 'menuItems'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'price', 'isAvailable'],
            properties: {
                id: uuidField,
                name: string,
                price: number,
                isAvailable: { type: 'boolean' },
                restaurantId: uuidField,
                created_at: timestamps,
                updated_at: timestamps,
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