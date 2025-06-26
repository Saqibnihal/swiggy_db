const BaseModel = require("./constants/BaseModel");
const { uuidField, string, timestamps, boolean } = require("./constants/type");
class Restaurant extends BaseModel {
    static get tableName() {
        return 'restaurants'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'location', 'isOpen'],
            properties: {
                id: uuidField,
                name: string,
                location: string,
                isOpen: boolean,
                created_at: timestamps,
                updated_at: timestamps,
            }
        }

    }

    static get relationMappings() {
        const MenuItem = require('./menuItems')
        const Order = require('./orders')
        return {
            menuItems: {
                relation: BaseModel.HasManyRelation,
                modelClass: MenuItem,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${MenuItem.tableName}.restaurantId`
                }
            },
            orders: {
                relation: BaseModel.HasManyRelation,
                modelClass: Order,
                join: {
                    from: `${this.tableName}.id`,
                    to: `${Order.tableName}.restaurantId`
                }
            }
        };

    }


}
module.exports = Restaurant;