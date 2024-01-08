const express = require('express');

const response = require('../../../Network/response.js');
const controller = require('./index.js');
const secure = require('./secure.js');


const router = express.Router()

//Routes

router.get('/', list)
router.get('/:id', get)
router.get('/user/:userId', getByUser)
router.post('/', upsert)
router.post('/', secure("update") ,upsert)



function list(req,res,next) {
    controller.list()
    .then(data=>{
        response.success(req,res,data,200)
    })
    .catch(next)
}
function get(req,res,next) {
    controller.get(req.params.id)
    .then( data => {
        response.success(req, res, data)
    })
    .catch(next)
}
function upsert(req,res,next ) {
    controller.upsert(req.body)
    .then( data => {
        response.success(req, res, data,201)
    })
    .catch(next)
}
function getByUser(req,res,next) {
    controller.getByUser(req.params.userId)
    .then( data => {
        response.success(req, res, data)
    })
    .catch(next)
}


module.exports = router 