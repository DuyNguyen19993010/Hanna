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

// fetch mulitple items from a page in catalog
// METHOD: GET URI: /items PARAM:?page=page-index HTTP/3 

const get_multi_item_uri = '/items/:page';

route.get(get_multi_item_uri, async (req,res)=>{

    try{

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
        
        res.send(query.rows);

    }
    catch(err){

        res.status(400).send(err);

    }
});

// fetch an item from catalog
// METHOD: GET URI: /item/item_id HTTP/3

const get_item_uri = '/item/:item_id';

route.get(get_item_uri, async (req,res)=>{
    
    try{
    
        // Postgres query

        let query = await new Promise((resolve,reject)=>{
            
            let qstring = `SELECT * FROM catalog WHERE id='${req.params.item_id}'`;
            
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

// add a new item to catalog
// METHOD: POST URI: /items HTTP/3

const post_item_uri = '/item_add';

route.post(post_item_uri, fileHandler.single('img'), async (req,res)=>{
    console.log(req.file.filename);
    try{
        
        // Insert query

        const dest = req.file.destination;
        
        const fname = req.file.filename;
        
        const fpath = path.join(dest,fname);

        let queryRes = await new Promise((resolve, reject) => {
            
            let qstring = `INSERT INTO catalog (name,minquan,price,img) 
                                        VALUES (
                                        '${req.body.name}',
                                        ${parseInt(req.body.minQuan)},
                                        ${parseInt(req.body.price)},
                                        '${fpath}') 
                                        RETURNING *`

            // let qstring = `INSERT INTO catalog (name,minquan,price) 
            // VALUES (
            // '${req.body.name}',
            // ${parseInt(req.body.minQuan)},
            // ${parseInt(req.body.price)}) 
            // RETURNING *`

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
    
                    reject(res)
                
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

// update an item from catalog
// METHOD: PUT URI: /item/item_id HTTP/3

module.exports = route;