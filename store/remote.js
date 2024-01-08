const request = require('request')


function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    function list(table) {
        return req('GET', table)
    }
    function get(table,id) {
        return req('GET', table, id);
    }
    async function upsert(tabla, data) {
        return request({
          method: 'PUT',
          url: `upsert/${tabla}`,
          data
        })
      }
    function query(table, query, join) {
        return request({
            method: 'GET',
            url: `/query/${table}`,
            data: {
              "query": query,
              "join": join
            }
          })
    }

    function create(table, data) {
        return request({
          method: 'POST',
          url: `/${table}`,
          data
        })
      }
    
      async function remove(tabla, id) {
        return request({
          method: 'DELETE',
          url: `/${tabla}/${id}`
        })
      }

    function req(method, table, data) {
        let url = URL + '/' + table
        body = '';

        return new Promise ((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if (err) {
                    console.error("Error DB Remota", err);
                    return reject(err.message)
                }
                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }
    return { list, query, upsert, get, create, remove }
}



module.exports = createRemoteDB



