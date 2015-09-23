
module.exports.mailgun = {
	//Your api key, from Mailgun’s Control Panel
	apiKey: 'key-3b4f538196b2d3c9a69723e03d45ab27',
	//Your domain, from the Mailgun Control Panel
	domain: 'sandbox6a9664debf1b4bc6a15d95822344a930.mailgun.org',
	//Your sending email address
	support: 'support@lingwing.com',
	noreply: 'noreply@lingwing.com',
	invoice: 'invoice@lingwing.com',
	defaultFrom: 'Invoice ',
	getnoreply: function (email) {
		return (email || this.defaultFrom) + " <" + this.noreply + ">";
	},
	getsupport: function () {
		return "lingwing.com Team <" + this.support + ">";
	},
	getinvoice: function (email) {
		return (email || this.defaultFrom) + " <" + this.invoice + ">";
	}
};