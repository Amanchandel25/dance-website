const express =require("express");
const path=require("path");
const fs=require("fs");
const app= express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true});
const port=80;

var contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    Email: String,
    address: String,
});
var contact= mongoose.model('Details', contactSchema)
//express stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())
//pug stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
//endpoint 
app.get('/',(req,res)=>{
    const params={"title":"my first pug","content":"my first backend and frontend site"}
    res.status(200).render("index.pug",params);
})
app.get('/contact',(req,res)=>{
    const params={"title":"my first pug","content":"my first backend and frontend site"}
    res.status(200).render("contact.pug",params);
})
app.post('/contact', (req, res)=>
{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})
//server 
app.listen(port,()=>{
    console.log(`sucesfully port ${port}`)
}
)