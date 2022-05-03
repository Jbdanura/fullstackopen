const usersRouter = require("express").Router()
const bcrypt = require("bcrypt")
const { response } = require("express")
const User = require("../models/user")

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
})

usersRouter.get("/", async(req,res)=>{
    try{
        const users = await User.find({}).populate("blogs")
        res.json(users)
    } catch(error){
        res.status(500).send("error retrieving users")
    }
    
})


module.exports = usersRouter