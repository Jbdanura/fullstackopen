const router = require('express').Router()
const Blog = require("../models/Blog")

router.get("/", async(req,res)=>{
    const blogs = await Blog.findAll()
    res.json(blogs)
})
router.post("/",async(req,res)=>{
    const blog = Blog.build(req.body);
    await blog.save()
    res.json(blog)
})
router.delete("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        Blog.destroy({
            where: {id}
        })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router