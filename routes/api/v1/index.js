const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const usersAuthRouter = require('./userAuthRoutes');
const verifyToken = require('../../../middlewares/verifyToken');


router.use('/auth', authRoutes);
router.use('/users', verifyToken, usersAuthRouter);

module.exports = router;