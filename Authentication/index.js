const jwt = require('jsonwebtoken')
const error = require('../Utils/error.js')

const { config } = require('../config')

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret)
}
const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        //COMPROBAR
        if (decoded.id !== owner) {
            throw error("No puedes hacer esto", 401)
        }

    },
    logged: function(req) {
        const decoded = decodeHeader(req);
        /* if (decoded.id !== owner) {
            throw error("No puedes hacer esto", 401)
        } */

    }
}
function getToken(auth) {
    if (!auth) {
        throw new Error("No token")
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error("Formato inválido")
    }

    let token = auth.replace('Bearer ','')
    return token
}

function verify(token) {
    return jwt.verify(token, secret)
    
}

function decodeHeader(req) {
 const authorization = req.headers.authorization || '';
 const token = getToken(authorization);
 const decoded = verify(token);
 req.user = decoded;
 return decoded   
}
module.exports = { sign, check }