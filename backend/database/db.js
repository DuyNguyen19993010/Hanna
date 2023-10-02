const {Client} = require('pg');
const {createClient} = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({path:__dirname + `/../env/.env.${process.env.NODE_ENV}`}); 

const client = createClient(process.env.API_URL, process.env.API_KEY); 

module.exports = client;