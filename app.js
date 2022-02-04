const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});
const port = 8000;

// main().catch(err => console.log(err));

// async function main() 

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const Contact = mongoose.model('Contact', contactSchema);


// express specific stuff
// app.use(express.static('static',options))
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine', 'pug') // set the temlate engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// endpoints
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {

    var myData  = new Contact(req.body);
    myData.save().then(()=>{
       res.send("this is item has been saved to database") 
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });

    // res.status(200).render('contact.pug');
})

// start the server
app.listen(port, () => {
    console.log(`the application started succesfully on port ${port}`);

});

 