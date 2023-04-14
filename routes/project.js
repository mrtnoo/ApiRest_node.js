'use strict'

var express = require('express');
const { getProjects } = require('../controllers/project');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart ({ uploadDir: './uploads' })

router.get('/home',ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save_project',ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.delete('/project/:id?', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile)

module.exports = router;