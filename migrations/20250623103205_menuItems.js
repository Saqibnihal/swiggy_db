/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('menuItems', table => {
        table.uuid('id').primary()
        table.uuid('restaurantId').references('id').inTable('restaurants').onDelete('CASCADE');
        table.string('name').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.boolean('isAvailable').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('menuItems')
};
