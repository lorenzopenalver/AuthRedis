const express = require('express');

const secure = require('./secure.js')
const response = require('../../../Network/response.js');
const controller = require('./index.js')

const router = express.Router()

//Routes

router.get('/', list)
router.get('/:id', get );
router.post('/follow/:id', secure('follow') , follow );
router.get('/:id/following', following );
router.post('/', upsert)
router.put('/', secure('update') ,upsert);





//Internal Funcitions
function list(req ,res , next) {
    controller.list()
    .then((lista)=>{
        response.success(req, res, lista, 200)
     })
     .catch(next);
}
function get (req, res , next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
    
}
function upsert (req, res , next) {

    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
    
}
function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
    .then(data => {
        response.success(req, res, data , 201)
    })
    .catch(next)
}
function following(req, res, next) {
    controller.following(req.params.id)
    .then(data => {
        response.success(req, res, data , 201)
    })
    .catch(next)
}

module.exports = router