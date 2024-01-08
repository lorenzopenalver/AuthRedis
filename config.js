require('dotenv').config();
const config = {
    api: {
        port: process.env.PORT || 3000
    },
    jwt: {
        secret: process.env.SECRET || "NoSecret"
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'vyU7DCqzKX',
        password: process.env.MYSQL_PASS || 'hQ8gtxIQ9o',
        database: process.env.MYSQL_DB || 'vyU7DCqzKX',
    },
    mysqlService: {
        host: process.env.MSQL_SRV_HOST || 'localhost',
        port: process.env.MSQL_SRV_PORT || 3001
    },
    post: {
        port: process.env.POST_PORT || 3003
    }
}

module.exports = { config }