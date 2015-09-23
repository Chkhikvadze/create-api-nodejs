
module.exports.mailgun = {
	//Your api key, from Mailgun’s Control Panel
	apiKey: '<%= mailgun_apiKey %>',
	//Your domain, from the Mailgun Control Panel
	domain: '<%= mailgun_domain %>',
	//Your sending email address
	support: '<%= mailgun_support %>',
	noreply: '<%= mailgun_noreply %>',
	defaultFrom: '<%= mailgun_defaultFrom %>',
	getnoreply: function (email) {
		return (email || this.defaultFrom) + " <" + this.noreply + ">";
	},
	getsupport: function () {
		return this.support;
	}
};