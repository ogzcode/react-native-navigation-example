import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import jwt from 'jsonwebtoken'
import { authMiddleware } from './authMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/register", async (req, res) => {
    const { username, password } = req.body

    const data = readFileSync('./model/data.json', 'utf8');

    const users = JSON.parse(data).users;
    const user = users.find(user => user.username === username);

    if (user) {
        res.status(400).json({ error: 'Username already exists' })
    }

    users.push({ username, password });

    writeFileSync('./model/data.json', JSON.stringify({
        "users": users
    }));

    res.status(201).json({ message: 'User created successfully.' })
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body

    const data = readFileSync('./model/data.json', 'utf8');

    const users = JSON.parse(data).users;
    const user = users.find(user => user.username === username);

    if (user === undefined || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: user.username }, "hello", { expiresIn: '10m' })

    return res.status(200).json({ token })
})

app.get("/getProfile", authMiddleware, async (req, res) => {
    const { username } = req.user
    const data = readFileSync('./model/data.json', 'utf8');

    const users = JSON.parse(data).users;

    const user = users.find(user => user.username === username);

    res.status(200).json({ user })
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});