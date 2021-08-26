'use strict';
const {sequelize, DataTypes} = require('./sequelize-loader');

const Todo = sequelize.define(
  'todos',
  {
    id        : {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true,
      allowNull    : true
    },
    title     : {
      type     : DataTypes.STRING,
      allowNull: false
    },
    memo      : {
      type     : DataTypes.STRING,
      allowNull: false
    },
    done      : {
      type        : DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull   : false
    },
    created_at: {
      type     : DataTypes.DATE,
      allowNull: false
    },
    done_at   : {
      type: DataTypes.DATE
    },
    username  : {
      type     : DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps     : false,
    indexes        : [{fields: ['username']}]
  }
);

module.exports = Todo;
