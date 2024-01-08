const express = require('express')
const { config } = require('../config')
const bodyParser = require('body-parser')
const router = require('./network')


const app = express()


app.use(bodyParser.json())
app.use('/',router)


app.listen(config.mysqlService.port, ()=> {
    console.log("Servicio de MySQL ON",config.mysqlService.port );
})