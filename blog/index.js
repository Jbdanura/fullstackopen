const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require("./utils/logger")
const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")


const connectDB = async () => {
    try{
        await mongoose.connect(config.MONGODB_URI)
        logger.info('connected to MongoDB')
    } catch(error){
        logger.error('error connecting to MongoDB:', error.message)
    }
}

connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/blogs",blogsRouter)
app.use("/api/users",usersRouter)
app.use("/api/login", loginRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = {app, connectDB}