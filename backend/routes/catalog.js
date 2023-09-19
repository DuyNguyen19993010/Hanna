const dotenv = require('dotenv');

const fs = require('fs');

const path = require('node:path');

const express = require('express');

const route = express.Router();

// File handler for Uploading files

const fileHandler = require('../fileHandler/utilities/fileHandler');

// database client

const dbClient = require('../database/db');
const { join } = require('path');

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
            
                    resolve( res );
            
                }
                
                else{
            
                    reject(res)
                
                }            
            })
        })
        
        // Send item list to client
        
        if(query.rowCount != 0){

            res.send(query.rows);

        }
        else{

            res.status(410).send(false)

        }

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
        
        // Insert query

        const dest = req.file.destination;
        
        const fname = req.file.filename;
        
        const fpath = path.join(dest,fname);

        // TODO: Parse image to byte stream 

        let queryRes = await new Promise((resolve, reject) => {
            
            let qstring = `INSERT INTO catalog (name,minquan,price,img) 
                                        VALUES (
                                        '${req.body.name}',
                                        ${req.body.minQuan},
                                        ${req.body.price},
                                        '${fpath}') 
                                        RETURNING *`

            dbClient.query(qstring,(err,res)=>{
            
                if(!err){

                    resolve(res.rows);
                
                }
                else{

                    reject(err);

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
const delete_item_uri = '/items/:item_id';

route.delete(delete_item_uri, async (req,res)=>{
    try{

        let queryRes = await new Promise((resolve, reject)=>{

            const qstring = `DELETE FROM catalog WHERE id='${req.params.item_id}'  RETURNING *`
    
            dbClient.query(qstring,(err,res)=>{
    
                if(!err){
    
                    resolve(res)
    
                }
                else{
    
                    reject(err)
                
                }
            });
    
        })

        if(queryRes.rowCount != 0){

            // Delete file from server
            
            let filePath = queryRes.rows[0].img;

            try{

                fs.unlinkSync(filePath);

            }
            catch(err){

                res.status(410).send(false);

            }
            res.send(queryRes.rows[0]);

        }
        else{

            res.status(410).send(false);

        }
        
    }
    catch(err){

        res.send(err)
    }

})

module.exports = route;