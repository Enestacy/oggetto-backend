'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    title: {
      type: DataTypes.STRING,
    },
    point: {
      type: DataTypes.NUMBER
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: `${Math.floor(Math.random() * 4)}${(Math.random() + 1).toString(36).substring(7)}`
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: "tasks",
    timestamps: false
  });
  return Task;
};