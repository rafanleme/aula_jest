const { v4: uuid } = require("uuid");

module.exports = generateUUID = () => {
  return uuid();
};
