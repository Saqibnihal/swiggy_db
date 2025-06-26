
const uuidField = { type: 'string', format: 'uuid' };

const timestamps = { type: "string", format: "date-time" };

const string = { type: "string" };

const number = { type: "number" };

const phone = { type: "string", pattern: "^[0-9]{10,15}$" };

const boolean = { type: "boolean" }

const address = { type: "string", minLength: 5, maxLength: 300 }

module.exports = { uuidField, timestamps, string, number, phone, boolean, address }