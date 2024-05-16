
const getNamespace = require('cls-hooked').getNamespace;
const userLogin = getNamespace('userLogin');

const beforeCreate = async (model, option) => {
    model.createdBy = await userLogin.get('user').dataValues.id;
};
const beforeUpdate = async (model, option) => {
    model.updatedBy = await userLogin.get('user').dataValues.id;
};
const beforeDestroy = async (model, option) => {
    model.deletedBy = await userLogin.get('user').dataValues.id;
};


// Export fungsi setup agar dapat digunakan di file lain
module.exports = {
    beforeCreate,
    beforeUpdate,
    beforeDestroy
};
