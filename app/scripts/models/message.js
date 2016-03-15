var Backbone = require('backbone');


var Message = Backbone.Model.extend({
	defaults: {
		author: null,
		text: '',
		sent_time: ''//date object and format

	},
	idAttribute: '_id',

});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/ironchat/'
});


module.exports = {
  'Message': Message,
  'MessageCollection': MessageCollection
};
