
module.exports = {
	jwt_secret: '<%= jwt_secret %>',
	jwt_valid_days: 1,
	connectionString: function () {
		return 'mongodb://<%= databasePath %>:<%= databasePort %>/<%= databaseName %>';
	},
	uploadServerPath: '<%= uploadServerPath %>'
};