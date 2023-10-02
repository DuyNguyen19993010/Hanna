// Import crucial functions from gulp task runner

const {src, dest, watch, series} = require('gulp');

// Import sass compiler

const sass_compiler = require('gulp-sass')(require('sass'));

// SASS to compile

const sass_files = './assets/ui/sass/*.scss';

// Style builder function to process sass to css

function styleBuilder(){
    
    // PIPELINE: Find the sass files to compile ===> Compile the sass file ===> Put result to destination folder

    return src(sass_files).pipe(sass_compiler()).pipe(dest('./assets/ui/css'));

}

// Whenever sass changes, run the the builder to recompile the file.

function watchTask(){

    watch([sass_files], styleBuilder);

}

exports.default = series(styleBuilder, watchTask);