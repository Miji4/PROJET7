const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});


sequelize.authenticate()
.then(() => console.log('Connection to has been established successfully.'))
.catch((err) => console.log('Unable to connect to the database:', err));

//sequelize.sync({ force: true });

module.exports = sequelize;