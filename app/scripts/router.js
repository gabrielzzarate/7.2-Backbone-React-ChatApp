//3rd party
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

//local
var messageModel = require('./models/message.js');
var userModel = require('./models/user.js');
var appComponents = require('./components/chatapp.jsx');

//instances
var messages = new messageModel.MessageCollection();
var User = new userModel.User()
var ChatApp = appComponents.ChatApp;
var MessageList = appComponents.MessageList;
var ChatForm = appComponents.ChatForm;

var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'chat/' : 'chat'
  },
  initialize: function(){
  },

  chat: function(){
  	ReactDOM.render(
			<ChatApp collection={messages} model={User} />,
				$('#wrapper')[0]
	 	);


  },

  login: function() {


  }

});


module.exports = new Router();
