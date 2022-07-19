const router = require('express').Router()
const Blog = require("../models/Blog")
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const User = require("../models/User")

router.get("/", async(req,res,next)=>{
    try {
        const blogs = await Blog.findAll({include: {model: User}})
        res.json(blogs)
    } catch {
        error=>next(error)
    }
})

router.post("/",async(req,res,next)=>{
    try {
        const blog = Blog.build(req.body);
        await blog.save()
        res.json(blog)
    } catch {
        error=>next(error)
    }
})
router.delete("/:id",async(req,res,next)=>{
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      let decodedToken
      try {
        decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch{
        res.status(401).json({ error: 'token invalid' })
      }
      const user = await User.findByPk(decodedToken.id)
      try {
            const blog = await Blog.findByPk(req.params.id)
            if(blog){
                if(blog.userId === user.id){
                    await blog.destroy()
                    res.send("deleted")
                } else{
                    res.send("invalid user/blog")
                }
            }
            res.status(204).end()
        } catch {
            error=>next(error)
        }
    }  else {
      res.status(401).json({ error: 'token missing' })
    }

})

router.put("/:id", async(req,res,next)=>{
    try {
        const blog = await Blog.findByPk(req.params.id)
        if(blog){
            blog.likes = req.body.likes
            await blog.save()
            res.json(blog)
        }
        res.status(404).end()    
    } catch (error){
        res.send(error)
    }
})

module.exports = router