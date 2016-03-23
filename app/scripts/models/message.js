var Backbone = require('backbone');


var Message = Backbone.Model.extend({
	defaults: {
		username: '',
		user_avatar: 'https://trip101.com/assets/default_profile_pic-9c5d869a996318867438aa3ccf9a9607daee021047c1088645fbdfbbed0e2aec.jpg',
		text: '',
		sent_time: ''//date object and format

	},
	idAttribute: '_id',


});
var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages/',

  //'http://tiny-lasagna-server.herokuapp.com/collections/ironchat/'
});


module.exports = {
  'Message': Message,
  'MessageCollection': MessageCollection
};
