const express = require('express');
const { fetchTodosByUser, addTodo, updateTodo, deleteTodo, fetchTodosByFilter } = require('../controller/todo')

const router = express.Router();

//  '/todos' is already included in base path
router.get('/:id', fetchTodosByUser)
    .get('/sort/:id', fetchTodosByFilter)
    .post('/', addTodo)
    .patch('/:id', updateTodo)
    .delete('/:id', deleteTodo);

exports.router = router;