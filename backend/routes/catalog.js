const dotenv = require('dotenv');

const fs = require('fs');

const path = require('node:path');

const express = require('express');

const route = express.Router();

// File handler for Uploading files

const fileHandler = require('../fileHandler/utilities/fileHandler');

// database client

const dbClient = require('../database/db');

// catalog API:

// fetch mulitple items from a page in catalog
// METHOD: GET URI: /items PARAM:?page=page-index HTTP/3 

const get_multi_item_uri = '/items/:page';

route.get(get_multi_item_uri, async (req,res)=>{

    try{

        // Postgres query

        const {data, err} = await dbClient.
        from('catalog').select()
        
        if(err){
            
            res.status(400).send(err)
        
        }
        else{

            // Send item list to client
            res.send(data);

        }

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
        
        const {data, err} = await dbClient.
        from('catalog').
        select().
        eq('name',"bread").
        single();

        res.send(data);

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

        let new_item = {name:req.body.name,minquan:req.body.minQuan,price:req.body.price,img:fpath}

        // Insert query
        
        const {err} = await dbClient.from('catalog').
        insert(new_item);

        // Send new returned item to the client
        
        if(!err){

            res.send(new_item);

        }
        
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

        // let queryRes = await new Promise((resolve, reject)=>{

        //     const qstring = `DELETE FROM catalog WHERE id='${req.params.item_id}'  RETURNING *`
    
        //     dbClient.query(qstring,(err,res)=>{
    
        //         if(!err){
    
        //             resolve(res)
    
        //         }
        //         else{
    
        //             reject(res)
                
        //         }
        //     });
    
        // })

        // if(queryRes.rowCount != 0){

        //     // Delete file from server
            
        //     let filePath = queryRes.rows[0].img;

        //     try{

        //         fs.unlinkSync(filePath);

        //     }
        //     catch(err){

        //         res.status(410).send(false);

        //     }
        //     res.send(queryRes.rows[0]);

        // }
        // else{

        //     res.status(410).send(false);

        // }

        console.log(req.params.item_id);
        let {err} = await dbClient.from('catalog').delete().eq('id',req.params.item_id);
        
        if(!err){

            res.status(200).send(true);

        }
        else{
            res.status(400).send(err);
        }

    }
    catch(err){

        res.send(err)
    }

})

// update an item from catalog
// METHOD: PUT URI: /item/item_id HTTP/3

module.exports = route;