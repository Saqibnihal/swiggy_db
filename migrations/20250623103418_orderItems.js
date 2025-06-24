/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
  return knex.schema.createTable('orderItems',function(table){
    table.uuid('id').primary();
    table.uuid('orderId').references('id').inTable('orders').onDelete('CASCADE');
    table.uuid('menuItemId').references('id').inTable('menuItems').onDelete('CASCADE');
    table.integer('quantity');
    table.integer('itemPrice');
    table.integer('total');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('orderItems')
};
