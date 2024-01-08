const express = require('express');
const { config } = require('../config.js')
const errors = require('../Network/errors.js')
const user = require('./components/user/network.js');
const auth = require('./components/auth/network.js');



//const bodyParser = require('body-parser')

const app = express();



//ROUTER
app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)


app.use(errors)
app.listen(config.api.port, ()=> {console.log("Funcionando"), config.api.port})



