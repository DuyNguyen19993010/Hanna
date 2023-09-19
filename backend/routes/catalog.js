const dotenv = require('dotenv');

const express = require('express');

const route = express.Router();

// File handler for Uploading files

const fileHandler = require('../fileHandler/utilities/fileHandler');

// database client

const dbClient = require('../database/db');

try{

    dbClient.connect();
    console.log('Database connection successful');

}
catch(err){

    console.log('Error database connection');

}

// catalog API:

// check if all parameter exists

function paramChecker(param_list, req_params){

    return new Promise((resolve,reject)=>{
        
        // Check number of params in request

        const lengthEqual = (param_list.length == req_params.length);
        
        // Check if required params exist;

        const param_list_keys = Object.keys(param_list);
        
        const req_params_keys = Object.keys(req_params);

        let all_param_included = true;

        for(let i = 0; i < param_list_keys.length; i++){

            const param_exist = req_params_keys.includes(param_list_keys[i]);

            if(!param_exist){
                
                all_param_included = false;
                
                break;
            
            }
        
        }
        const res = lengthEqual && all_param_included; 
        
        res? (resolve(true)):(reject('Bad request'));
    });

}

// fetch mulitple items from a page in catalog
// METHOD: GET URI: /items PARAM:?page=page-index HTTP/3 

const get_multi_item_uri = '/items';

const get_multi_item_param = {page:true};

route.get(get_multi_item_uri, async (req,res)=>{
    
    try{
        // Check if params exist
        
        let param_check = await paramChecker(get_multi_item_param,req.query);
    
        // Postgres query

        let query = await new Promise((resolve,reject)=>{
            
            let qstring = 'SELECT * FROM catalog';
            
            dbClient.query(qstring,(err,res)=>{
            
                if(!err){
            
                    resolve( res.rows );
            
                }
                
                else{
            
                    reject()
                
                }            
            })
        })
        
        // Send item list to client
        
        res.status(200).send(query);

    }
    catch(err){

        res.status(400).send(err);

    }
});

// fetch an item from catalog
// METHOD: GET URI: /item/item_id HTTP/3

// add a new item to catalog
// METHOD: POST URI: /items HTTP/3

const post_item_uri = '/items_add';

route.post(post_item_uri, fileHandler.single('image'), async (req,res)=>{
    
    try{
        
        // TODO: Authorize user

        // Insert query

        // TODO: Parse image to byte stream 

        let queryRes = await new Promise((resolve, reject) => {
            
            let qstring = `INSERT INTO catalog (name,minquan,price) 
                                        VALUES ('
                                        ${req.body.name}',
                                        ${req.body.minQuan},
                                        ${req.body.price}) 
                                        RETURNING *`

            dbClient.query(qstring,(err,res)=>{
            
                if(!err){

                    resolve(res.rows);
                
                }
                else{

                    reject([])

                }
            })
        })

        // Send new returned item to the client

        res.send(queryRes);
    
    }
    catch(err){

        res.status(400).send(err);

    }
})

// remove an item from catalog
// METHOD: DELETE  URI: /item/item_id HTTP/3

// update an item from catalog
// METHOD: PUT URI: /item/item_id HTTP/3

module.exports = route;