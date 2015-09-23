var response = require('../helpers/response.js');
var Model = require('../models/project.js');
var mongoose = require('../models/mongoose.js');
var crudController = require('./crudController.js')(Model);

var fs = require('fs');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');


var config = require('config.json')(__dirname + '/../generator/template/server/config.json');
var appPath = 'c:/giga/';
var pathServerTemplate = __dirname + "/../generator/template/server/";

var format = require('string-format');
format.extend(String.prototype);

function createProject() {
    var debugApi = "betSport-api";
    var port = "7777";

    var uploadServerPath = "http://localhost:7777/uploads/";
    var databasePath = "localhost";
    var databasePort = "27017";
    var databaseName = "betSport";
    var jwt_secret = "vinc gaamxilos ketilebi..";


    var mailgun = {
        apiKey: 'key-3b4f538196b2d3c9a69723e03d45ab27',
        domain: 'sandbox6a9664debf1b4bc6a15d95822344a930.mailgun.org',
        support: 'support@betSport.com',
        noreply: 'noreply@betSport.com',
        defaultFrom: 'betSport from'
    };

    var USER_ACTIVATION_CALLBACK_URL = "http://localhost:3000/#activate/";
    var USER_FORGOT_CALLBACK_URL = "http://localhost:3000/#reset/";

    var getCredentials = "LhzJG4br1tdtI34843GZRxC47c7RTVcga99Vb1tCXbZYMGlHPN";


    for (var dir in config.mkdirs) {
        var pathCreate = appPath + config.mkdirs[dir];
        if (!fs.existsSync(pathCreate)) {
            fs.mkdirSync(pathCreate);
        }
    }

    var store = memFs.create();
    var edit = editor.create(store);

    for (var file in config.files) {
        console.log(config.files[file].path);
        var pathFile = config.files[file].path;

        var pathFrom = pathServerTemplate + pathFile;
        var pathTo = appPath + pathFile;
        edit.copyTpl(pathFrom, pathTo, {
            port: port,
            debugApi: debugApi,
            uploadServerPath: uploadServerPath,
            databasePath: databasePath,
            databasePort: databasePort,
            databaseName: databaseName,
            jwt_secret: jwt_secret,
            mailgun_apiKey: mailgun.apiKey,
            mailgun_domain: mailgun.domain,
            mailgun_support: mailgun.support,
            mailgun_noreply: mailgun.noreply,
            mailgun_defaultFrom: mailgun.defaultFrom,
            USER_ACTIVATION_CALLBACK_URL: USER_ACTIVATION_CALLBACK_URL,
            USER_FORGOT_CALLBACK_URL: USER_FORGOT_CALLBACK_URL,
            getCredentials: getCredentials
        });
    }

    edit.commit(function () {
        console.log("finish");
    });
}

//function fillSchemaFields(fields, schema) {
//
//    for (var index in fields) {
//        var field = fields[index];
//
//        if (field.type.name === {}) {
//            if (field.fields !== undefined) {
//                schema[field.name] = {};
//                fillSchemaFields(field.fields, schema[field.name]);
//            } else {
//                schema[field.name] = {};
//            }
//        }
//        else if (field.type.name === []) {
//            if (field.fields !== undefined) {
//                schema[field.name] = [{}];
//                fillSchemaFields(field.fields, schema[field.name][0]);
//            } else {
//                schema[field.name] = [];
//            }
//        }
//        else {
//            schema[field.name] = {
//                type: field.type,
//            };
//            if (field.type.ref !== undefined) {
//                schema[field.name] = {ref: field.type.ref};
//            }
//        }
//
//        if (field.default !== undefined) {
//            schema[field.name] = {default: field.default};
//        }
//
//        if (field.required === true) {
//            schema[field.name] = {required: true};
//        }
//
//        if (field.unique === true) {
//            schema[field.name] = {unique: true};
//        }
//
//        if (field.index === true) {
//            schema[field.name] = {index: true};
//        }
//
//        if (field.userInfo === true) {
//            schema['docInfo'] = {
//                createDate: {type: Date, default: Date.now},
//                user: {type: mongoose.Schema.ObjectId, ref: 'User'}
//            }
//        }
//    }
//}

function fillSchemaFields(fields, schema, parent) {

    var filterFields = fields.filter(function (e) {
        if (e.parent === parent)
            return e;
    })

    for (var index in filterFields) {
        var field = filterFields[index];

        if (field === undefined)
            continue;

        if (field.type === 'String') {
            schema[field.name] = {type: 'String'};
        }
        else if (field.type === 'Number') {
            schema[field.name] = {type: 'Number'};
        }
        else if (field.type === 'Date') {
            schema[field.name] = {type: 'Date'};
        }
        else if (field.type === 'Buffer') {
            schema[field.name] = {type: 'Buffer'};
        }
        else if (field.type === 'Boolean') {
            schema[field.name] = {type: 'Boolean'};
        }
        else if (field.type === 'Mixed') {
            schema[field.name] = {type: 'Mixed'};
        }
        else if (field.type === 'ObjectId') {
            schema[field.name] = {type: 'ObjectId'};
        }
        else if (field.type === 'Array') {
            schema[field.name] = [];

            fillSchemaFields(fields, schema[field.name], field.name);
        }
        else if (field.type === 'Object Array') {
            schema[field.name] = [{}];

            fillSchemaFields(fields, schema[field.name][0], field.name);
        }
        else if (field.type === 'Object') {
            schema[field.name] = {};

            fillSchemaFields(fields, schema[field.name], field.name);

            if (Object.keys(schema[field.name]).length <= 0)
                schema[field.name] = {type: {}}
        }

        if (field.default !== undefined) {
            schema[field.name]['default'] = field.default;
        }

        if (field.ref !== undefined) {
            schema[field.name]['ref'] = field.ref;
        }

        if (field.required === true) {
            schema[field.name]['required'] = true;
        }

        if (field.unique === true) {
            schema[field.name]['unique'] = true;
        }

        if (field.index === true) {
            schema[field.name]['index'] = true;
        }

    }
}


module.exports.list = function (req, res) {

    createProject();


    var giga = require('string-format');
    giga.extend(String.prototype);

    Model.findOne({}, function (err, result) {
        var models = result.models;

        for (var i = 0; i < models.length; i++) {

            var model = models[i];

            var schema = {};

            fillSchemaFields(model.fields, schema, "");

            if (model.userInfo === true) {
                schema['docInfo'] = {
                    createDate: {type: 'Date', default: 'Date.now'},
                    user: {type: 'ObjectId', ref: 'User'}
                }
            }

            var store = memFs.create();
            var edit = editor.create(store);

            var pathFrom = pathServerTemplate + 'models/model';
            var pathTo = appPath + 'models/' + model.name + ".js";

            var jsonStr = JSON.stringify(schema, null, 4);
            var text = edit.read(pathFrom);
            var repo = {name: model.name, fields: jsonStr}


            text = text.format(repo);
            edit.write(pathTo, text);
            edit.commit(function () {
                console.log("finish model copy");
            });


            //copy controller
            var store = memFs.create();
            var edit = editor.create(store);

            var pathFrom = pathServerTemplate + 'controllers/modelController.js';
            var pathTo = appPath + 'controllers/' + model.name + "Controller.js";

            edit.copyTpl(pathFrom, pathTo, {modelName: model.name});
            edit.commit(function () {
                console.log("finish copy controller");
            });
            //copy controller end




            //create router start
            var store = memFs.create();
            var edit = editor.create(store);
            var pathFrom = pathServerTemplate + 'routes/index.js';
            var pathTo = appPath + 'routes/index.js';
            var fileTxt = "";
            if (edit.exists(pathTo)) {
                fileTxt = edit.read(pathTo);
            }else{
                fileTxt = edit.read(pathFrom)
            }

            var array = [];
            var index = fileTxt.indexOf('\n');
            while (index > -1) {
                var line = fileTxt.substring(0, index);
                fileTxt = fileTxt.substring(index + 1);
                array.push(line);
                index = fileTxt.indexOf('\n');
            }
            array.push(fileTxt);

            //var searchStart = array.filter(function(e){
            //    if (e.indexOf("{Start Default Router}") > -1){
            //        console.log(e);
            //        return e
            //    }
            //});
            //var indexStart = array.indexOf(searchStart[0]);


            var searchEnd = array.filter(function(e){
                if (e.indexOf("{End Default Router}") > -1){
                    console.log(e);
                    return e
                }
            });
            var indexEnd = array.indexOf(searchEnd[0]);

            var repo = {name: model.name}
            var routeTxt = "    router.use('/api/v1/{name}/', crudGenerator.model(require('../models/{name}.js')));".format(repo);
            array.splice(indexEnd - 1, 0, routeTxt);

            var writeText = array.join("\n");
            edit.write(pathTo, writeText);
            edit.commit(function () {
                console.log("finish Router Index write");
            });

            setTimeout(function() {
            }, 3000);
            //create router end

            console.log(array);


        }
    });


    //var model = {
    //    name: "course",
    //    list: {is: true, tokenRequire: true},
    //    read: {is: true, tokenRequire: true},
    //    delete: {is: true, tokenRequire: true},
    //    create: {is: true, tokenRequire: true},
    //    update: {is: true, tokenRequire: true},
    //    fields: []
    //};
    //var field = {
    //    name: "Code",
    //    type: {name: mongoose.Schema.String},
    //    default: "001",
    //    unique: false,
    //    index: false,
    //    required: false,
    //    userInfo: false
    //};
    //var field1 = {
    //    name: "course",
    //    type: {name: mongoose.Schema.ObjectId, ref: "Course"},
    //    unique: false,
    //    index: false,
    //    required: false,
    //    userInfo: false
    //};
    //var field2 = {
    //    name: "course",
    //    type: {name: {}},
    //    fields: [{
    //        name: "name",
    //        type: {name: mongoose.Schema.String},
    //        default: "001",
    //        unique: false,
    //        index: false,
    //        required: false,
    //        userInfo: false
    //    }]
    //};
    //var field3 = {
    //    name: "course",
    //    type: {name: []},
    //    fields: [{
    //        name: "name",
    //        type: {name: mongoose.Schema.String},
    //        default: "001",
    //        unique: false,
    //        index: false,
    //        required: false,
    //        userInfo: false
    //    }]
    //};
    //
    //model.fields.push(field);
    //model.fields.push(field1);
    //model.fields.push(field2);
    //model.fields.push(field3);
    //


    return crudController.list(req, res);
};

function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

module.exports.read = crudController.read;
module.exports.delete = crudController.delete;
module.exports.create = crudController.create;
module.exports.update = crudController.update;