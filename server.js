// Packages, connections
const dotenv = require('dotenv'); // in order to use .env
dotenv.config() // in order to use .env

const express = require(`express`)
const app = express()

const { default: mongoose } = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on(`connected`, () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.use(express.urlencoded({ extended: false })); // expect user data to come in

const Fruit = require(`./models/fruit.js`)

app.get (`/`, async (req, res) => {
    res.render(`index.ejs`)
})

app.post(`/fruits`, async (req, res) => {
    console.log(req.body);
    res.send(req.body)
    res.redirect(`/fruits/new`)
})

app.get(`/fruits/new`, (req, res) => {
    res.render(`new.ejs`)
})

const portNumber = 3002
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})