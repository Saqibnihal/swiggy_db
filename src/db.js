const { Model } = require("objection");
const config = require("../knexfile").development;

const db = require("knex")(config);
Model.knex(db);

module.exports = db;
