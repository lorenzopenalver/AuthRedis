const auth = require('../../../Authentication');



module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                //Codigo
                const owner = req.body.user
                auth.check.own(req, owner)
                next()
                break;
            default:
                next()
        }
    }
    return middleware
}

