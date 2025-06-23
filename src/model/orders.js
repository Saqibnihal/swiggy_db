const {Model} = require('objection')

class orders extends Model{
    static get tableName(){
        return 'orders';
    }
    static get relationMappings(){
        const User = require('./user')
    }
}


module.exports=orders