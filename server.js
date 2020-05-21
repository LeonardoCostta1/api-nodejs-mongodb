const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const app = express()

const routes = require('./src/Routes')

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://Leonardo:09071975@leonard-kadkh.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); 

app.use('/api',routes)

app.listen(3000,()=>{
    console.log('OK')
})