const express = require('express');

const response = require('../../../Network/response.js');
const controller = require('./index.js')

const router = express.Router()

router.post('/login', function (req, res){
    controller.login(req.body.username, req.body.password)
    .then(token=>{
        response.success(req,res,token, 200)
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
})

module.exports = router