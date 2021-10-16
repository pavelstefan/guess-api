const assert = require('assert');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models').user;
const jwt = require('../utils').jwt;

router.post('/register', async (req, res) => {
    try {
        assert(req.body.email, 'email is mandatory');
        assert(req.body.password, 'password is mandatory');
        assert(req.body.firstName, 'firstName is mandatory');
        assert(req.body.lastName, 'lastName is mandatory');

        const {
            email, password, firstName, lastName
        } = req.body;

        const userExists = await User.findOne({ where: { email: email.toLowerCase() } });
        assert(!userExists, 'User cannot be created. Email is already used');

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email: email.toLowerCase(),
            passwordHash: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.status(200).json({
            status: 200,
            data: null,
            message: null
        })

    } catch (err) {
        res.status(400).json({
            status: 400,
            data: null,
            message: err.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        assert(req.body.email);
        assert(req.body.password);

        const {
            email, password
        } = req.body;

        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        assert(user, '');

        const passwordCheck = await bcrypt.compare(password, user.passwordHash);
        assert(passwordCheck, '');

        
        const token = jwt.generateAccessToken({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            passwordHash: user.passwordHash
        });

        res.status(200).json({
            status: 200,
            data: {
                token
            },
            message: null
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            data: null,
            message: err.message
        });
    }
});

module.exports = router;
