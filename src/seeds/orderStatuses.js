/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { v4: uuidv4 } = require('uuid');
const { PLACED, CONFIRMED, PREPARING, OUT_DELIVERY, DELIVERED, CANCELLED } = require("../constants-seeds/constants");

exports.seed = async function (knex) {
  await knex('orderStatuses').del()
  await knex('orderStatuses').insert([
    { id: PLACED, code: 'PLACED', label: 'Order Placed', orderIndex: 1 },
    { id: CONFIRMED, code: 'CONFIRMED', label: 'Restaurant Accepted', orderIndex: 2 },
    { id: PREPARING, code: 'PREPARING', label: 'Preparing FOod', orderIndex: 3 },
    { id: OUT_DELIVERY, code: 'OUT_DELIVERY', label: 'Out for Delivery', orderIndex: 4 },
    { id: DELIVERED, code: 'DELIVERED', label: 'Delivered', orderIndex: 5 },
    { id: CANCELLED, code: 'CANCELLED', label: 'Order Cancelled', orderIndex: 9 },
  ]);
};