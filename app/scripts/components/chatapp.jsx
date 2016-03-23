var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-react-component');
var Firebase = require('firebase');
var myRootRef = new Firebase('https://popping-torch-6591.firebaseio.com/');
require('reactfire');

//local
var models = require('../models/message.js');
var RouterMixin = require('./mixins.js');


// component that holds the state of the application
var ChatApp = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	componentDidMount: function() {
		setInterval(function(){
				this.props.collection.fetch();
		}.bind(this), 2000);


	},

	render: function() {

		return (
			<div id="wrapper" className="chatApp col-md-6 col-md-offset-1">
					<div id="menu">
						<p className="welcome">Hello {this.props.model.get('username')}, welcome to DevChat!</p>
        		<p className="logout"><a id="exit" href="#">Logout</a></p>
        	</div>


					<div id="chatbox" className="col-md-10 col-md-offset-1">
						<MessageList messages={this.props.collection}/>
					</div>
					<ChatForm model={this.props.model}/>
			</div>

		);
	}

});

// the message ul

var MessageList = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
			var messageDetails = this.props.messages.map(function(msg) {
						//var className = msg.attributes.username == this.props.msg.get('username')? 'right': 'left';
            return (<Message key={msg.cid} msg={msg} />);

        }.bind(this));
        return (
            <ul className='messagesList className'>
                {messageDetails}
            </ul>
		);
	}

});

// the message li

var Message = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	render: function() {
			var messages = this.props.msg;

			return (
				 <li className='message'>
				 				<div className="avatar">
				 				    <span className='userAvatar'> <img src={this.props.msg.get("user_avatar")} /> </span>
				 				</div>
                <span className='messageTime'> at {this.props.msg.get('time')}</span>
                <span className='username'> {this.props.msg.get('username')} said: </span>
                <span className='messageText'> {this.props.msg.get('content')}</span>
         	</li>
		);
	}
});

// the form where message is written

var ChatForm = React.createClass({
		mixins: [Backbone.React.Component.mixin],
		handleSubmit: function(e){
			e.preventDefault();
			var date = new Date();
			var chatData = {

				content: $('#usermsg').val(),
				username: this.props.model.get("username"),
				time: date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2),
				user_avatar: this.props.model.get("user_avatar")
			};



			console.log(chatData);

			this.getCollection().create(chatData);
			$('#usermsg').val('');

		},

		render: function() {
			return (
				<form onSubmit={this.handleSubmit} name="message">
						<input name="usermsg" type="text" id="usermsg" size="63" />
						<button  name="submitmsg" className="btn btn-success submit-btn" type="submit" id="submitmsg">Send</button>
				</form>
			);
		}
		});

module.exports = {
	"ChatApp": ChatApp,
	"MessageList" : MessageList,
	"Message": Message,
	"ChatForm": ChatForm
};
