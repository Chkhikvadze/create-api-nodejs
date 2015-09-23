/**
 * Created by Giga.
 */

var mongoose = require('mongoose');

// define the schema for our user model
var projectSchema = mongoose.Schema({
    name: String,
    title: String,
    web: String,
    address: String,
    port: String,
    type: {},
    database: {
        name: String,
        port: String,
        address: String
    },
    docInfo: {
        createDate: {type: Date, default: Date.now},
        user: {type: mongoose.Schema.ObjectId, ref: 'User'}
    },
    mailgun: {
        apiKey: String,
        domain: String,
        support: String,
        noreply: String,
        defaultFrom: String
    },
    USER_ACTIVATION_CALLBACK_URL: String,
    USER_FORGOT_CALLBACK_URL: String,
    debugApi: String, //'test-api',
    uploadServerPath: String,
    jwt_secret: String,
    getCredentials: String,
    description: String,
    server : {type : Boolean},
    admin : {type : Boolean},
    client : {type : Boolean},
    models: [{
        name: String,
        title: String,
        description: String,
        list: {
            is: {type: Boolean, default: false},
            tokenRequire: {type: Boolean, default: false}
        },
        read: {
            is: {type: Boolean, default: false},
            tokenRequire: {type: Boolean, default: false}
        },
        delete: {
            is: {type: Boolean, default: false},
            tokenRequire: {type: Boolean, default: false}
        },
        create: {
            is: {type: Boolean, default: false},
            tokenRequire: {type: Boolean, default: false}
        },
        update: {
            is: {type: Boolean, default: false},
            tokenRequire: {type: Boolean, default: false}
        },
        userInfo: {type: Boolean, default: true},
        fields: [{
            name: {type: String},
            title: {type: String},
            type: {type: String}, //mongoose.Schema.String, [],
            parent: {type: String, default : ""},
            ref: {type: String},
            default: {type: String},
            unique: {type: Boolean},
            index: {type: Boolean},
            required: {type: Boolean},
            fields: [{}]
        }]
    }]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Project', projectSchema);
