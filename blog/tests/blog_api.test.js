const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require("../models/blog")
const api = supertest(app)

const initialBlogs = [
    {
        title: "Cagar",
        author: "Cagon",
        url: "xd",
        likes: 420,
    },
    {
        title: "Mear",
        author: "Meon",
        url: "lol",
        likes: 69,
    },
    {
        title: "LM",
        author: "AO",
        url: "ROFL",
        likes: 42,
    },
]

beforeEach(async() => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test("returns correct amount of blogs", async()=>{
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(3)
})

test("has id property", async()=>{
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test("blog can be added", async ()=>{
    const newBlog = {
        title: "Wer",
        author: "Sad",
        url: "Weqas",
        likes: 42,
    }
    await api.post("/api/blogs").send(newBlog)
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(4)
})

test("can delete a blog", async ()=>{
    await api.delete("/api/blogs/Cagar")
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(2)
})

test("can update likes of a blog", async()=>{
    await api.put("/api/blogs/Cagar/99999")
    const response = await api.get("/api/blogs")
    expect(response.body[0].likes).toBe(99999)
})