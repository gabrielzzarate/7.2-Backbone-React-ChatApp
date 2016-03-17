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

var Router = Backbone.Router.extend({
  routes: {
    '': 'login',
    'chat/:username' : 'chat'
  },

	chat: function(username){

  		if(username){
  			ReactDOM.render(
			<ChatApp collection={messages} model={User} />,
			$('#app')[0]
	 	);
	 } else {
	 		Backbone.history.navigate('', {trigger: true});
	 }
	},

  login: function() {

			ReactDOM.render(
			<LoginRoute collection={messages} model={User} />,
			$('#app')[0]
		);

  }

});


module.exports = new Router();
