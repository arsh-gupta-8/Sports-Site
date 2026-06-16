import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json())

let data = ['Arsh']

// WEBSITE ENDPOINTS

app.get('/', (req, res) => {
    console.log('Reached an endpoint', req.method)
    res.send(`
        <body 
        style="background:yellow;
        color: green;">
            <h1>DATA</h1>
            <p>${JSON.stringify(data)}</p>
        </body>`)
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
    data.push(dataEntry.name)
    console.log(dataEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log("Deleted an element from the data list")
    res.sendStatus(204)
})

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`)
})