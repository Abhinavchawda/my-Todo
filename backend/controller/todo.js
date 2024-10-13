const { useActionData } = require("react-router-dom");
const { todo } = require("../models/todo")

exports.fetchTodosByUser = async (req, res) => {
    const { email } = req.params
    try {
        const todos = await todo.find({ email: email });
        res.status(200).json(todos);
    }
    catch (err) {
        console.log("ERROR from todo.js (controller) in fetchTodosByUser() : ", err);
        res.status(400).json(err);
    }
};

exports.fetchTodosByFilter = async (req, res) => {
    const { email } = req.params;
    let query = todo.find({ email: email }).sort({ priority: -1 });
    try {
        const todos = await query;
        res.status(200).json(todos);
    }
    catch (err) {
        console.log("ERROR from todo.js (controller) in fetchTodosByFilter() : ", err);
        res.status(400).json(err);
    }
};

exports.addTodo = async (req, res) => {
    const temp = new todo(req.body);
    try {
        const doc = await temp.save();
        res.status(201).json(doc);
    }
    catch (err) {
        console.log("ERROR from todo.js (controller) in addTodo() : ", err);
        res.status(400).json(err);
    }
}

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const temp = await todo.findByIdAndUpdate(id, req.body, { new: true }).exec();
        res.status(200).json(temp);
    }
    catch (err) {
        console.log("ERROR from todo.js (controller) in updateTodo() : ", err);
        res.status(400).json(err);
    }
}

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        // const item = await Cart.findById(id).exec()
        const temp = await todo.findByIdAndDelete(id).exec();
        res.status(200).json(temp);
    }
    catch (err) {
        console.log("ERROR from todo.js (controller) in deleteTodo() : ", err);
        res.status(400).json(err);
    }
}

//to delete a todo from the DB
// app.delete('/', (req, res) => {
//     const deleteResult = todo.deleteOne({u_id: req.body}).then(function(){console.log("deleted")}).catch(function(){console.error("Error aaya hai")});
//     res.send({result: deleteResult})
// })