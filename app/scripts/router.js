//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

//local
var messageModel = require('./models/message.js');
var userModel = require('./models/user.js');
var appComponents = require('./components/chatapp.jsx');
var loginComponent = require('./components/login.jsx');

//instances
var messages = new messageModel.MessageCollection();
var User = new userModel.User();
var ChatApp = appComponents.ChatApp;
var MessageList = appComponents.MessageList;
var ChatForm = appComponents.ChatForm;
var LoginRoute = loginComponent.LoginComponent;

messages.comparator = 'sent_time';


var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'chat/' : 'chat'
  },

	chat: function(username){


  			ReactDOM.render(
			<ChatApp collection={messages} model={User} />,
			$('#app')[0] );


	},

  login: function() {

			ReactDOM.render(
			<LoginRoute collection={messages} model={User} />,
			$('#app')[0]
		);

  }

});


module.exports = new Router();
