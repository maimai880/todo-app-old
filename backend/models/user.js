'use strict';
const {sequelize, DataTypes} = require('./sequelize-loader');

const User = sequelize.define(
  'users',
  {
    username: {
      type      : DataTypes.STRING,
      primaryKey: true,
      allowNull : false
    },
    password: {
      type     : DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps     : false
  }
);

module.exports = User;
