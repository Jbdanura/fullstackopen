require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')
const express = require("express");
const app = express();

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
},{
    sequelize,
    modelName: "blogs",
    underscored: true,
    timestamps: false,
})

Blog.sync()

app.get("/api/blogs", async(req,res)=>{
    const blogs = await Blog.findAll()
    res.json(blogs)
})
app.post("/api/blogs",async(req,res)=>{
    const blog = Blog.build(req.body);
    await blog.save()
    res.json(blog)
})
app.delete("/api/blogs/:id",async(req,res)=>{
    try {
        const id = req.params.id
        Blog.destroy({
            where: {id}
        })
    } catch (error) {
        res.json(error)
    }
})

app.listen(3001,()=>{
    console.log("running on port 3001");
});