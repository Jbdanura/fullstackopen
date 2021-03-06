require('dotenv').config()

const express = require("express");
const app = express();
const { PORT }= require("./util/config")
const { connectToDatabase } = require("./util/db")
const blogsRouter = require("./controllers/blogs");
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const Blog = require('./models/Blog');
const User = require('./models/User');
const sequelize = require('sequelize')

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.get("/api/authors",async(req,res)=>{
  const authors = await Blog.findAll({
    group:["author"],
    attributes:["author",[sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes'],[sequelize.fn('COUNT', sequelize.col('title')), 'blogs'] ],
    }
  )
  res.json(authors)
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT,()=>{
    console.log("running on port " + PORT);
  });
}

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.sync( {alter: true} )
User.sync( {alter: true} )

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

start()