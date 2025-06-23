/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('restaurants', table => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('location').notNullable();
        table.boolean('isOpen').notNullable();
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('restaurants');
};