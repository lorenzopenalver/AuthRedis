const express = require('express');
const { config } = require('../config.js')
const errors = require('../Network/errors.js')

const post = require('./components/post/network.js');
const bodyParser = require('body-parser')



const app = express();

/* app.use(express.json()) */
app.use(bodyParser.json())

//ROUTER
app.use('/api/post', post)

app.use(errors)
app.listen(config.post.port, ()=> {console.log("Post Funcionando"), config.post.port})



