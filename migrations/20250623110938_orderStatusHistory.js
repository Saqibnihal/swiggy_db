/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orderStatusHistory', table => {
        table.uuid('id').primary();
        table.uuid('orderId')
            .references('id').inTable('orders').onDelete('CASCADE');
        table.uuid('statusId')
            .references('id').inTable('orderStatuses').onDelete('CASCADE');
        table.enu('changedBy', ['system', 'restaurants']);
        table.bigInteger('changedAt').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orderStatusHistory');
};
