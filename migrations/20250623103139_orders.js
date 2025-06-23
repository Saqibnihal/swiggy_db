/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders',function(table){
        table.uuid('id').primary()
        table.uuid('userId').references('id').inTable('users').onDelete('CASCADE')
        table.uuid('restaurantId').references('id').inTable('restaurants').onDelete('CASCADE')
        table.uuid('statusId').references('id').inTable('orderStatuses').onDelete('CASCADE')
        table.integer('totalAmount').notNullable()
        table.timestamps(true,true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('orders')
};
