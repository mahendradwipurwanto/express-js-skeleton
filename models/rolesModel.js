'use strict';
const {Model} = require('sequelize');

// Define Role model
module.exports = (sequelize, DataTypes) => {
    class RolesModel extends Model {
      static associate(models) {
        this.hasMany(models.UserRolesModel, { foreignKey: 'm_roles_id' });
      }
    }
    RolesModel.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      access: DataTypes.TEXT('long')
    }, {
      sequelize,
      modelName: 'RolesModel',
      tableName: 'm_roles',
      paranoid: true
    });
  
    return RolesModel;
  };