const auth = require('../../../Authentication');



module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                //Codigo
                const owner = req.body.id
                auth.check.own(req, owner)
                next()
                break;
            case 'follow':
                //Codigo
                auth.check.logged(req)
                next()
                break;
            default:
                next()
        }
    }
    return middleware
}

