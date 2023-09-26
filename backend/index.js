const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//routes import

// catalog route
const catalog_router_baseuri = '/api/catalog'
const catalogRoutes = require('./routes/catalog');

// Selecting dot environment file to setup environment variables

dotenv.config({path:`./env/.env.${process.env.NODE_ENV}`})

// Middleware STACK

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({origins: '*'}))

// Routing

app.use(catalog_router_baseuri, catalogRoutes);

// PORT

const port = process.env.PORT;

// Setting up connection

app.listen(port, ()=> console.log(`Listening on port ${port}...`));