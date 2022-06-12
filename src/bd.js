const {Pool} = require('pg');

const poll=new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    port: 5432,
    database: 'Chess'
})

module.exports = poll