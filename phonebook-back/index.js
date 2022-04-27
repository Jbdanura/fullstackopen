const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo.js')
const { response } = require('express')
require('dotenv').config()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))


app.get('/api/persons',function(request,response){
  Person.find({}).then(persons=>{
    const people = persons.map(person=>({'name':person.name, 'number': person.number,'id':person._id}))
    response.send(people)
  })
})

app.get('/info',function(request,response){
  Person.find({}).then(persons => {
    const people = persons.map(person => person)
    const info = 'Phonebook has info for ' + people.length + ' people \n'
        + new Date()
    response.send(info)
  }).catch(error=>next(error))


})

app.get('/api/persons/:id', (req,res,next)=>{
  Person.find({_id:req.params.id})
    .then(person =>{
      res.json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next)=>{ 
  Person.findByIdAndRemove(req.params.id)
    .then(result=>{
      console.log('deleted', result)
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons',(req,res,next)=>{
  const body = req.body
  /*const same = phones.find(phone => phone.name == body.name)
    if(same){
    return  res.status(400).send(body.name  + " already exists")
    const id = Math.floor(Math.random() * 100000)
    body.id = id
    }*/
  if(body.name == ''){
    return res.status(400).send('name must be not empty')
  }
  if(body.number == ''){
    return res.status(400).send('phone must be not empty')
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson=>res.json(savedPerson)).catch(error=> next(error))
})

app.put('/api/persons/:name', (req,res,next)=>{
  const body = req.body
  Person.find({name:body.name})
    .then(person=>{
      const id = person[0]._id.valueOf()
      Person.findByIdAndUpdate(id, body).then(result => res.send(result))
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).send(error.message)
  }
  
  next(error)
}
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, function(){
  console.log('running on port 3001')
})