var Backbone = require('backbone');


var User = Backbone.Model.extend({
	idAttribute: 'id',

	defaults: {
		name: '',
		age: '',
		avatar: '',
		isActive: true,

	}
});

module.exports = {
	"User": User
};
