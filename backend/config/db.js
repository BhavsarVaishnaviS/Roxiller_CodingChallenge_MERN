const Sequelize = require('sequelize')

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS, {
//         dialect: 'mysql',
//         host: 'localhost'
//     }
// );

const sequelize = new Sequelize(
    "store_rating_db",
    "root",
    "shruti", {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize