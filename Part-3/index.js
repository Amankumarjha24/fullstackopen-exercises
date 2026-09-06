const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
morgan.token('body',(request, response) => {
        if(request.method == 'POST') {
            return JSON.stringify(request.body)
        }
        return ''
})


app.use(morgan(':method :url :status :res[content-length] - response-time ms :body'))

 let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request, response)=> {
    response.send("<h1>Hello user</h1>")
})

app.get('/api/notes',(request, response) => {
    response.json(notes)
})

app.get('/info',(request, response) => {
    const totalPerson = notes.length;
    const time = new Date()

    response.send(
        `<p>Phonebook has info for ${totalPerson} people</p>
    <p>${time}</p>`
    )
})

app.get('/api/notes/:id',(request, response) => {
    const id = request.params.id
    const note = notes.find(info => info.id === id)
    if(note) {
        response.json(note)
    }
    else{
        response.status(404).end()
    
    }
})

app.delete('/api/notes/:id',(request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(202).json({
        msg:"Note has been deleted"
    })
})
const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000000)
  return String(randomId)
}
app.post('/api/notes',(request, response) => {
    const data = request.body
    if(!data.name || !data.number) {
        return response.status(400).json({
            error: 'name must be unique' 
        })
    }
    const nameExist = notes.find(value => value.name == data.name)
    if(nameExist) {
        return response.status(400).json({
            error:"User already exist"
        })
    }
    const note = {
        id:generateId(),
        name: data.name,
        number: data.number
    }
    notes = notes.concat(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=> {
    console.log(`Surver is running of the port of ${PORT}`)
})