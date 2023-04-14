'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/portafolio')
        .then(() =>{    
            console.log("Conexion establecida eshoooooo... gatitoooo");
        
            //
            app.listen(port,() =>{
                console.log("servidor lanzado en la url local 3700");
            })
        
        })
        .catch(err => console.log(err));
