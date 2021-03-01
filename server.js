const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Repasar js',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
  {
    id: 2,
    content: 'Repasar React',
    date: '2019-05-30T19:20:14.298Z',
    important: false
  },
  {
    id: 3,
    content: 'Repasar Node,',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (req, res) => {
  res.send(JSON.stringify(notes))
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)
  console.log(maxId)
  const newNote = {
    id: maxId + 1,
    important: note.important,
    date: new Date().toISOString(),
    content: note.content
  }
  notes.push(newNote)
  res.send(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = +req.params.id
  notes = notes.filter((note) => note.id !== id)
  res.status(204).send(JSON.stringify(notes))
})

app.use((req, res) => {
  res.send({
    error: 'Not found'
  })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server running on port', port)
})
