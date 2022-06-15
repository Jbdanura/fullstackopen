const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).sort("likes").populate("user")
    response.json(blogs)
  })
  
blogsRouter.post('/', async(request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.send({title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id,
    comments: [],
    id: blog._id})
})

blogsRouter.delete("/:title", async(request,response)=>{
  try{
    const deleted = await Blog.deleteOne({title:request.params.title})
    response.status(200).json(deleted)
  }catch(exception){
    console.log(exception)
  }
})

blogsRouter.put("/:title/:likes", async(req,res)=>{
  try{
    const add = parseInt(req.params.likes) + 1
    const updated = await Blog.updateOne({title:req.params.title},{likes:add})
    res.status(200).json(updated)
  }catch(exception){
    console.log(exception)
  }
})

blogsRouter.post("/:id/comments/:comment",async(req,res)=>{
  try{
    const update = await Blog.updateOne({_id:req.params.id}, { $push: { "comments": req.params.comment } })
    res.status(200).json(update)
  }catch(exception){
    console.log(exception)
  }
})

blogsRouter.get("/:id/comments/",async(req,res)=>{
  try{
      const comments = await Blog.findOne({_id:req.params.id})
      res.json(comments)
  } catch(error){
      res.status(500).send("error retrieving comments")
  }
  })

module.exports = blogsRouter