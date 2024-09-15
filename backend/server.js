const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors')
const app = express();
const port = 8080;
app.use(cors());

const todoRouter = require("./routes/todo");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");

//middlewares
app.use(express.json()); // to parse req.body

app.use('/todos', todoRouter.router);
app.use('/users', userRouter.router);
app.use('/auth', authRouter.router);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo_project');
}

//to get all the todos from the db
app.get('/', async (req, res) => {
    res.json({success: true});
})

// //to delete a todo from the DB
// app.delete('/', (req, res) => {
//     const deleteResult = todo.deleteOne({u_id: req.body}).then(function(){console.log("deleted")}).catch(function(){console.error("Error aaya hai")});
//     res.send({result: deleteResult})
// })

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
})