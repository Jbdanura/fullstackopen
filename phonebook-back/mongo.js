const mongoose = require('mongoose')
require('dotenv').config()

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength:3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
  },
})


console.log('connecting to', process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URI).then(result=>{
  console.log('connected to MongoDB')
}).catch((error)=> console.log('failed to connect to MongoDB', error.message))



module.exports = mongoose.model('Person',personSchema)