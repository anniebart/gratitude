const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Gratitude = require('./models/gratitude');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.engine('ejs', ejsMate);



mongoose.connect('mongodb://localhost:27017/gratitude', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", ()=>{
    console.log("Database connected")
})

app.get('/', async (req, res)=>{
    const gratitude = await Gratitude.find({})
    res.render('index', { gratitude})
    })

app.post('/gratitude', async(req, res)=>{
    const gratitude = new Gratitude(req.body.gratitude);
    await gratitude.save();
    res.redirect('/')
    
})

app.listen(3000, ()=>{
    console.log('SERVER IS RUNNING')
})