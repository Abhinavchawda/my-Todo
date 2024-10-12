const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const app = express();
const port =  process.env.PORT || 8080;

require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");

const passportSetup = require("./passport");

const crypto = require("crypto");

app.use(
  cookieSession({
    name: "session",
    // key: ["myTodo", "todo"],
    keys: [crypto.randomBytes(32).toString('hex'), crypto.randomBytes(32).toString('hex')],
    signed: true,
    maxAge: 24*60*60*100
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
  })
)

const todoRouter = require("./routes/todo");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");

//middlewares
app.use(express.json()); // to parse req.body

// app.use(cors());

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