const BaseModel = require("./constants/BaseModel");
class Restaurant extends BaseModel {
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