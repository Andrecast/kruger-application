const {Pool} = require('pg'); /* Pool es una clase que me permite crear una nueva conexión a la BD*/

const pool = new Pool({ /* en pool guardo el objeto de conexión */
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'krugerdb'
})

module.exports = pool;