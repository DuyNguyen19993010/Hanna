const multer = require('multer');

// Defining upload path

const uploadPath = __dirname + './../upload/'; 

// Configure multer file upload' s "destination" and "filename"

const storage = multer.diskStorage({

    // File-upload-destination configuration

    destination:(req,file,cb)=>{

        cb(null, uploadPath);

    },
    // File-name configuration
    
    filename:(req,file,cb)=>{

        cb(null, Date.now() + '-' + file.originalname);

    }});

// Create a multer instance with the created configuration

const fileHandler = multer({storage:storage});

module.exports = fileHandler;
