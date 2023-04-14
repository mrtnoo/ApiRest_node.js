'use strict'


var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message:'Soy la home'
        });
        
    },

    test: function(req, res){
        return res.status(200).sed({
            message: 'soy el test'
        });
    },

    saveProject: function(req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
      

        return res.status(200).send({project: projectStored});
            
        });
    },

    getProject: function(req, res){
        var projectId = req.params.id;


        Project.findById(projectId, (err, projectId) =>{

            return res.status(200).send({project});
        });
    },

    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err, projects) => {
           
            return res.status(200).send({projects});
        });
    },


    deleteProject: function(req,res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).sed({message: 'no se puede borrar el'})
        
            return res.status(200).send({
                project: projectRemoved})
        
        });
    },

    uploadImage: function(req,res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1]
           
            if(fileExt == 'png' || fileExt == 'jpeg'  || fileExt == 'jpg'||  fileExt=='gif'){

                Project.findByIdAndUpdate(projectId, {image: fileName},{new:true}, (err, projectUpdated) =>{
 
                    return res.status(200).send({
                        project: projectUpdated
                    });
    
                });

            }else{
                fs.unlink(filePath, (err) => {
                    return {message: 'la extencion no es valida'}

                });
            }


        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    },


    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.open(path_file, (err) =>{
            if(!err){
                return res.sendFile(path.resolve(path_file));          
            }else{
                return res.status(200).send({
                    message : "no existe la img"
                });                }
        });
    }



};



module.exports = controller;