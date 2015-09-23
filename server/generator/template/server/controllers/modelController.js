
var response = require('../helpers/response.js');
var Model = require('../models/<%= modelName %>.js');
var crudController = require('./crudController.js')(Model);


module.exports.list = crudController.list;
module.exports.read = crudController.read;
module.exports.delete = crudController.delete;
module.exports.create = crudController.create;
module.exports.update = crudController.update;