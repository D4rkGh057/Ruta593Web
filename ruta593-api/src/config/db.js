const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ruta593',
    password: '1234',
    port: 5432,
});

module.exports = pool; 