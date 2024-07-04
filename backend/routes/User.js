const express = require('express');
const { fetchUserById } = require('../controller/User');

const router = express.Router();

//  '/users' is already included in base path
router.get('/:id', fetchUserById)
    // .patch('/:id', updateUser)

exports.router = router;