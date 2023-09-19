const {Client} = require('pg');
const dotenv = require('dotenv');

dotenv.config({path:__dirname + `/../env/.env.${process.env.NODE_ENV}`}); 

const client = new Client({
    host:process.env.DB_HOST,
    database:process.env.DB,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS
})

module.exports = client;