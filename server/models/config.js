/**
*Created by Giga on 06/17/2015
*/

// see documetation 
var mongoose = require('mongoose');

var configShema = mongoose.Schema({
	type : String, 
	isStop : {type : Boolean, default : false},
	docInfo:{
		createDate : {type : Date, default : Date.now},
		user : {type:  mongoose.Schema.ObjectId, ref: 'User'}
	}
})


module.exports = mongoose.model('Config', configShema);
