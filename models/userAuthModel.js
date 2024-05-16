'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const RecordSignature = require('../helpers/recordSignature');

module.exports = (sequelize, DataTypes) => {
  class UserAuthModel extends Model {
    static associate(models) {
      this.hasMany(models.UserRolesModel, { as:'roles', foreignKey: 'm_user_auth_id' });
    }
  }
  UserAuthModel.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    createdBy: DataTypes.UUID,
    updatedBy: DataTypes.UUID,
    deletedBy: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'UserAuthModel',
    tableName: 'm_user_auth',
    paranoid: true,
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      },
      beforeCreate: async (user, options) => {
        await RecordSignature.beforeCreate(user,options);
      },
      beforeUpdate: async (user, options) => {
        await RecordSignature.beforeUpdate(user,options);
      },
      beforeDestroy: async (user, options) => {
        await RecordSignature.beforeDestroy(user,options);
      },
    }
  });
  return UserAuthModel;
};