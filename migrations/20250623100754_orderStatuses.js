/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orderStatuses', function (table) {
        table.uuid('id').primary();
        table.string('code').notNullable();
        table.string('label').notNullable();
        table.integer('orderIndex').notNullable();
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orderStatuses')
};