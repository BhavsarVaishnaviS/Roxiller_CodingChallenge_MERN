const { DataTypes } = require("sequelize");
const connection = require("../config/db");

const Store = connection.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(400)
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "id"
    },
    onDelete: "CASCADE"
  },
  rating: {
    type: DataTypes.NUMBER, 
    defaultValue: null
  }
}, {
  tableName: "stores", 
  timestamps: true, 
  createdAt: "created_at",
  updatedAt: false
});

module.exports = Store;
