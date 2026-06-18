import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let data = [{id: 1, team1: 'Argentina', team2: 'Algeria', score: '3-0'}];

// API ENDPOINTS

app.get('/api/matches', (req, res) => {
    console.log('Data requested');
    res.send(data);
});

app.post('/api/data', (req, res) => {
    const dataEntry = req.body;
    data.push(dataEntry.name);
    console.log(dataEntry.name);
    res.sendStatus(201);
});

app.delete('/api/data', (req, res) => {
    data.pop();
    console.log("Deleted an element from the data list");
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}`);
});