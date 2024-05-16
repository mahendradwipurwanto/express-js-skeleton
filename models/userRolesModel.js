'use strict';
const {Model} = require('sequelize');

// Define UserRoles model
module.exports = (sequelize, DataTypes) => {
    class UserRolesModel extends Model {
      static associate(models) {
        this.belongsTo(models.UserAuthModel, { foreignKey: 'm_user_auth_id' });
        this.belongsTo(models.RolesModel, { foreignKey: 'm_roles_id' });
      }
    }
    UserRolesModel.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      m_user_auth_id: DataTypes.UUID,
      m_roles_id: DataTypes.UUID
    }, {
      sequelize,
      modelName: 'UserRolesModel',
      tableName: 'm_user_roles',
      paranoid: true
    });
  
    return UserRolesModel;
  };