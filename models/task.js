'use strict';
const {
  Model
} = require('sequelize');
const { compareAsc, format } = require('date-fns')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Tag, {
        foreignKey: 'tag'
      });
      this.belongsToMany(models.User, { through: models.User_Tasks, onDelete: 'CASCADE' });
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
    description: {
      type: DataTypes.TEXT,
    },
    point: {
      type: DataTypes.NUMBER
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: `${Math.floor(Math.random() * 4)}${(Math.random() + 1).toString(36).substring(7)}`
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: format(new Date(Date.now()), 'yyyy/MM/dd h:mm:ss')
    },
    tag: {
      type: DataTypes.UUID
    },
    category: { type: DataTypes.ENUM(["quite", "social-party", "online-activity"]) }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: "tasks",
    timestamps: false
  });
  return Task;
};