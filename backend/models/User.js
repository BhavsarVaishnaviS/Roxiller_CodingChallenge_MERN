const { DataTypes } = require("sequelize");
const connection = require("../config/db");

const User = connection.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [20, 60],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
         msg: "Must be a valid email address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   len: {
    //     args: [8, 16],
    //     msg: "Password must be 8 to 16 characters long",
    //   },
    //   isStrong(value) {
    //     const uppercase = /[A-Z]/;
    //     const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    //     if (!uppercase.test(value) || !specialChar.test(value)) {
    //       throw new Error("Password must contain at least one uppercase letter and one special character");
    //     }
    //   },
    // },
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "user", "owner"),
    defaultValue: "user",
  }
},
  {
    tableName:'users',
    timestamps:true,
  }
);

module.exports = User;


