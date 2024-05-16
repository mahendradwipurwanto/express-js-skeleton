const {
    processPagination,
    generatePaginationMeta,
    processWhereEqualFilter,
    processWhereLikeFilter,
    only,
    except
} = require('../helpers/generalHelper');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { UserAuthModel, RolesModel,UserRolesModel } = require('../models'); // Pastikan Anda telah mengimpor model User dari file yang sesuai
const createUserRequest = require('../request/user/createUserRequest');

// Export fungsi-fungsi controller dengan menerapkan customResponseMiddleware
exports.createUser = [
    createUserRequest.rule,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await UserAuthModel.create(req.body);
            res.success(user, 'User created successfully');
        } catch (error) {
            res.failed(error.message, 400);
        }
    }
];

exports.getAllUsers = async (req, res) => {
    try {

        let { limit, page, offset, filter } = processPagination(req, req.query);

        const filterEqual = only(filter, 'password', 'id', 'email')
        const filterLike = except(filter, 'password', 'id', 'email')

        const andWhereLikeFilter = processWhereLikeFilter(filterLike);
        const andWhereEqualFilter = processWhereEqualFilter(filterEqual);
        const { count, rows } = await UserAuthModel.findAndCountAll({
            paranoid: false,
            offset: offset,
            limit: limit,
            where: {
                [Op.and]: [andWhereLikeFilter, andWhereEqualFilter]
            },
            include: [
                {
                    model : UserRolesModel,
                    as : 'roles',
                    include : RolesModel
                }
            ]
        });

        // Mengembalikan respons dengan format yang diinginkan
        const formattedRows = rows.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles.map(userRole => ({
                m_roles_id: userRole.m_roles_id,
                name: userRole.RolesModel.name // Mengakses nama RolesModel melalui alias
            }))
        }));
        const paginationMeta = generatePaginationMeta(req, page, limit, count);

        res.success(formattedRows, "Success", paginationMeta);

    } catch (error) {
        res.failed(error.message, 500);
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserAuthModel.findByPk(id);
        if (!user) {
            return res.failed('User not found', 404);
        }
        res.success(user);
    } catch (error) {
        res.failed(error.message, 500);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await UserAuthModel.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedUser = await UserAuthModel.findByPk(id);
            return res.success({ user: updatedUser }, 'User updated successfully');
        }
        throw new Error('User not found');
    } catch (error) {
        res.failed(error.message, 500);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await UserAuthModel.destroy({
            where: { id }
        });
        if (deleted) {
            return res.success(null, 'User deleted successfully');
        }
        throw new Error('User not found');
    } catch (error) {
        res.failed(error.message, 500);
    }
};