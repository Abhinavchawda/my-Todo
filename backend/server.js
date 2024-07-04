const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors')
const app = express();
const port = 8080;
app.use(cors());

const todoRouter = require("./routes/todo");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");

//middle wares
app.use(express.json()); // to parse req.body

app.use('/todos', todoRouter.router);
app.use('/users', userRouter.router);
app.use('/auth', authRouter.router);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo_project');
}

// app.use()



//to get all the todos from the db
app.get('/', async (req, res) => {
    res.json({success: true});
})

//to create a new todo in the DB 
// app.post('/todos', async (req, res) => {
//     console.log("body : ", req.body);
//     // const td = req.body;
//     // const td = new todo({
//     //     task: req.body.task,
//     //     desc: req.body.desc,
//     //     date: req.body.date
//     // });
//     // console.log(td);
//     // await todo.insertOne(td);
//     // td.save();
//     res.send("Hii this is get");
// })

// app.patch('/todos', (req, res) => {
//     // const temp = todo.findById(req.body);
//     console.log("up : ", req.body)
//     res.send("Hii this is put");
// })

// //to delete a todo from the DB
// app.delete('/', (req, res) => {
//     const deleteResult = todo.deleteOne({u_id: req.body}).then(function(){console.log("deleted")}).catch(function(){console.error("Error aaya hai")});
//     res.send({result: deleteResult})
// })

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})