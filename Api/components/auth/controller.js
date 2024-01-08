const auth = require('../../../Authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const TABLA = 'auth'



module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/dummy.js')
    }
/*     async function login(username, password) {
        const data = await store.query(TABLA, {username: username})
        return bcrypt.compare(password, data.password)
        .then(areAlike => {
            if (areAlike === true) {
                return auth.sign(data)
            }else{
                throw new Error("Información Incorrecta")
            }
        })
       
    } */

    async function upsert(data) {
        const authData = {
            id: data.id,
        } 
       
        if (data.username) {
            authData.username = data.username
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10)
        }

        return store.upsert(TABLA, authData)
    }
    const login = async (username, password) => {
        let data = await store.query(TABLA, { username: username })
        
        if(!data){
            data = { password: ''}
        }

        return bcrypt.compare(password, data.password)
        .then((isValid) => {
            if(isValid){
                //TOKEN GENERATE
                return auth.sign({...data})       
            }else{
                throw new Error('Invalid information')
            }
        }).catch((err) => {
            throw new Error(err.message, 403)
        })
    }
    return {
        upsert,
        login
    }
}