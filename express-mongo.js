const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
const empc= require('./models/model')
const product = require("./data/Product")
const cors = require('cors')
const URL = "mongodb+srv://admin:admin123@cluster0.yklhn3g.mongodb.net/gfgdb2?retryWrites=true&w=majority&appName=Cluster0";

var app = express()
app.use(cors())
app.use(bp.json())

app.post('/addproduct', (req, res) => {
    const user= new empc({...req.body})
    user.save().then(()=> console.log('product added'))
    res.send('product added')

})
app.get('/loaddata',async(req,res)=>{
    const users= await empc.find();
    res.send(users)
})
app.get('/loaddata/:id',async(req,res)=>{
    const uid=parseInt(req.params.id)
    const users= await empc.findById(uid);
    res.send(users)
})

app.post('/adddata', async (req, res) => {
    await empc.insertMany(product.data);
    res.status(200).send('Products added successfully');
})
const startServer = async () => {
    await mongoose.connect(URL)
    app.listen(5000, () => {
        console.log('server is ready...!');
    })
}
startServer()