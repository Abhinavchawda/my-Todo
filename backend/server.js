const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors')
const app = express();
const port = 8080;

const todoRouter = require("./routes/todo");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");

//middlewares
app.use(express.json()); // to parse req.body

app.use(cors());

app.use('/todos', todoRouter.router);
app.use('/users', userRouter.router);
app.use('/auth', authRouter.router);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo_project');
}

app.get('/', async (req, res) => {
  res.json({ success: true });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})