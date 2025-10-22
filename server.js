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
const methodOverride = require(`method-override`)
// const morgan = require(`morgan`)

app.use(express.urlencoded({ extended: false })); // expect user input data from forms
app.use(methodOverride(`_method`))
// app.use(morgan(`dev`))

const Fruit = require(`./models/fruit.js`)

app.get (`/`, async (req, res) => { // GET request for the index route
    res.render(`home.ejs`)
})

app.delete(`/fruit/:fruitId`, async (req, res) => { // DELETE request
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect(`/fruits`)

})

app.get(`/fruits`, async (req,res) => { // GET request for index route all fruit documents / records (i.e. not a post request)
    const allFruits = await Fruit.find()
    res.render(`fruits/index.ejs`, {
        fruits: allFruits
    })
})


app.post(`/fruits`, async (req, res) => { // POST request to the fruits new route (i.e. not a get request)
    if(req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    console.log(req.body);
    await Fruit.create(req.body)
    
    // res.send(req.body)
    res.redirect(`/fruits`) // redirect to the GET fruits index route after the post fruits processing has run
    
})

app.get(`/fruits/new`, async (req, res) => {
    res.render(`fruits/new.ejs`)
})

app.get(`/fruits/:fruitId`, async (req, res) => { // GET request for show route
    const foundFruit = await Fruit.findById(req.params.fruitId)
    // res.send(`show page for ${foundFruit}`)
    res.render(`fruits/show.ejs` , {
        fruit: foundFruit
    })
})

const portNumber = 3002
app.listen(portNumber, () => {
    console.log(`Listening on port ${portNumber}`);
})