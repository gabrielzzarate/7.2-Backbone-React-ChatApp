var Backbone = require('backbone');

var md5 = require('blueimp-md5');


var User = Backbone.Model.extend({
	idAttribute: 'id',

	defaults: {
		username: '',
		email: '',
		user_avatar: 'https://trip101.com/assets/default_profile_pic-9c5d869a996318867438aa3ccf9a9607daee021047c1088645fbdfbbed0e2aec.jpg',
		isActive: true,

	},
	initialize: function(){
		var avatarUrl = md5(this.get('email').trim().toLowerCase());
		this.set({'user_avatar': 'http://www.gravatar.com/avatar/' + avatarUrl + '?d=identicon'});
	}
});

module.exports = {
	"User": User
};
