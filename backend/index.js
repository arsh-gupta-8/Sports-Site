import express from 'express';

const app = express();
const PORT = 3000;

let data = {
    name: 'Arsh',
    age: 18
}

// WEBSITE ENDPOINTS

app.get('/', (req, res) => {
    console.log('Reached an endpoint', req.method)
    res.send('<h1>Home Page</h1>')
})

app.get('/dashboard', (req, res) => {
    console.log('I hit the dashboard endpoint')
    res.send('<h1>Dashboard</h1>')
})

// API ENDPOINTS

app.get('/api/data', (req, res) => {
    console.log('Data requested')
    res.send(data)
})

app.post('/api/data', (req, res) => {
    const dataEntry = req.body
    console.log(dataEntry)
    res.sendStatus(201)
})


app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})