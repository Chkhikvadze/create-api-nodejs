
module.exports.mailgun = {
	//Your api key, from Mailgun’s Control Panel
	apiKey: 'key-3b5f538196b2d3c9a69723e03d45ab27',
	//Your domain, from the Mailgun Control Panel
	domain: '',
	//Your sending email address
	support: 'support@gigachkhikvadze.com',
	noreply: 'noreply@gigachkhikvadze.com',
	invoice: 'invoice@gigachkhikvadze.com',
	defaultFrom: 'Create ',
	getnoreply: function (email) {
		return (email || this.defaultFrom) + " <" + this.noreply + ">";
	},
	getsupport: function () {
		return "gigachkhikvadze.com  <" + this.support + ">";
	},
	getinvoice: function (email) {
		return (email || this.defaultFrom) + " <" + this.invoice + ">";
	}
};
