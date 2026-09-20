const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.static('dist'))
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

app.get('/info', (request, response) => {
    const totalPerson = notes.length;
    const time = new Date();

    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Phonebook Info</title>
            <style>
                body {
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    background: linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%);
                    height: 100vh;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 16px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                    text-align: center;
                    max-width: 400px;
                    width: 90%;
                    border-top: 5px solid #4f46e5;
                }
                .icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                .title {
                    color: #1f2937;
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                .stats {
                    color: #4b5563;
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }
                .highlight {
                    font-weight: bold;
                    color: #4f46e5;
                    font-size: 1.2rem;
                }
                .time-badge {
                    background: #f3f4f6;
                    color: #6b7280;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    margin: 0;
                    display: inline-block;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">📞</div>
                <h1 class="title">Phonebook Status</h1>
                <p class="stats">We currently have information for <span class="highlight">${totalPerson}</span> people.</p>
                <div class="time-badge">${time}</div>
            </div>
        </body>
        </html>
    `;

    response.send(htmlResponse);
});

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
app.use((req, res) => {
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found</title>
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #f8fafc;
                    height: 100vh;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 3rem 2rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    text-align: center;
                    max-width: 420px;
                    width: 90%;
                    animation: fadeIn 0.6s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .error-code {
                    font-size: 5rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1;
                }
                .title {
                    font-size: 1.5rem;
                    margin: 1rem 0 0.5rem 0;
                    font-weight: 600;
                }
                .message {
                    color: #94a3b8;
                    font-size: 0.95rem;
                    margin: 0 0 2rem 0;
                    line-height: 1.5;
                }
                .btn {
                    display: inline-block;
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                    color: white;
                    text-decoration: none;
                    padding: 0.8rem 1.8rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
                    transition: all 0.2s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1 class="error-code">404</h1>
                <h2 class="title">Page Not Found</h2>
                <p class="message">Oops! Tum jis page ko dhoondh rahe ho wo exist nahi karta ya delete ho chuka hai.</p>
                <a href="/" class="btn">Go Home</a>
            </div>
        </body>
        </html>
    `;

    res.status(404).send(htmlResponse);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=> {
    console.log(`Surver is running of the port of ${PORT}`)
})