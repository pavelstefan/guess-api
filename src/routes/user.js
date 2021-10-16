const assert = require('assert');
const express = require('express');
const router = express.Router();
const jwt = require('../utils').jwt;
const User = require('../models').user;

router.get('/', jwt.validateToken, async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await User.findOne({ where: { id } });
    assert(user, '');

    res.status(200).json({
      status: 200,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
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
