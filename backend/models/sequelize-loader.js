'use strict';

const {Sequelize, DataTypes} = require('sequelize');

const dialectOptions = {
  ssl: {
    require           : true,
    rejectUnauthorized: false
  }
};

const sequelize = process.env.DATABASE_URL
                  ? new Sequelize(process.env.DATABASE_URL,
                                  {logging: false, dialectOptions})
                  : new Sequelize('postgres://todo_app:todo_app_psql@localhost:5432/todo_app',
                                  {logging: false});

module.exports = {
  sequelize,
  DataTypes
};
