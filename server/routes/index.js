/// <reference path="../../typings/express/express.d.ts"/>
"use strict";


var express = require('express');
var response = require('../helpers/response.js');
var tokenController = require('../controllers/tokenController.js');
var userController = require('../controllers/userController.js');
var profileController = require('../controllers/profileController.js');
var crudGenerator = require('./crud.js');


var router = express.Router();


module.exports = function (app) {

    if (app.get('env') === 'development') {
        router.get('/token/:id', tokenController.gen_token);
    }

    router.all('/*', function (req, res, next) {
        req.request_ip = (req.headers["X-Forwarded-For"] ||
        req.headers["x-forwarded-for"] ||
        req.client.remoteAddress);

        next();
    });

    //define client api routes [BEGIN]
    ///////////////////////////////////////////////

    router.post('/api/v1/user/login/', userController.login);
    router.post('/api/v1/user/login/social/facebook/', userController.facebook);
    router.post('/api/v1/user/signup/', userController.signup);
    router.post('/api/v1/user/activate/', tokenController.require, userController.requestActivate);
    router.get('/api/v1/user/activate/:token', userController.activate);
    router.post('/api/v1/user/forgot/', userController.forgot);
    router.post('/api/v1/user/reset/', userController.reset);

    router.get('/api/v1/user/profile/:userId', tokenController.require, profileController.read);
    router.get('/api/v1/user/profile/', tokenController.require, profileController.read);
    router.put('/api/v1/user/profile/', tokenController.require, profileController.update);
    router.delete('/api/v1/user/profile/avatar/', tokenController.require, profileController.deleteAvatar);


    router.use('/api/v1/project/', tokenController.require, crudGenerator.controller(require('../controllers/projectController.js')));

    router.post('/api/v1/upload/', function (req, res) {
        var file = req.files.file;
        var filename = file.name;
        return res.status(200).json(response.success({filename: filename}));
    });


    return router;
};