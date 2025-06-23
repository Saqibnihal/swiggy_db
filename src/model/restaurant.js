const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");


class Restaurant extends Model {
    static get tableName() {
        return 'restaurants'
    }
    $beforeInsert() {
        if (!this.id) {
            this.id = uuidv4();
        }
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
                relation: Model.HasManyRelation,
                modelClass: MenuItem,
                join: {
                    from: 'restaurants.id',
                    to: 'menuItems.restaurantId'
                }
            },
            orders: {
                relation: Model.HasManyRelation,
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