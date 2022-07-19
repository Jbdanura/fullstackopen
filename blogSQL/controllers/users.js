const router = require('express').Router()

const Blog = require('../models/Blog')
const  User  = require('../models/User')

router.get('/', async (req, res) => {
  const users = await User.findAll({include:{model:Blog}})
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    console.log(user)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put("/:username",async(req,res)=>{
  try{
    const user = await User.findOne({where: {username: req.params.username}})
    user.username = req.body.newUsername
    await user.save()
    res.send(user)
  } catch(error){
    return res.status(400).json(error)
  }
})

module.exports = router