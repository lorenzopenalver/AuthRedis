const { config } = require('../config')
const mysql = require('mysql2')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    port: 3306,
    database: config.mysql.database,
};

let connection;



function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 20000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon()

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error,data)=>{
            if (error) {
                return reject(error)               
            }
            resolve(data)
        })
    })
}
function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (error,data)=>{
            if (error) {
                return reject(error)               
            }
            resolve(data)
        })
    })
}
function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data , (error, result)=>{
            if (error) {
                return reject(error)               
            }
            resolve(result)
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data,data.id] , (error, result)=>{
            if (error) {
                return reject(error)               
            }
            resolve(result)
        })
    })
}

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data) 
    }else{
        return insert(table, data)
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}



module.exports = { list, get, upsert, query }



