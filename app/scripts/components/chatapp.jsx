var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-react-component');
//local
var models = require('../models/message.js');


// component that holds the state of the application
var ChatApp = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	// getInitialState: function() {
	// 	return {
	// 		 messages: []
	// 	};
	// },
	componentDidMount: function() {
		this.props.collection.fetch();

	},

	render: function() {
		return (
			<div className="chatApp">
					<div id="menu">
						<p className="welcome">Welcome, <b></b></p>
        		<p className="logout"><a id="exit" href="#">Exit Chat</a></p>
        	</div>


					<div id="chatbox">
						<MessageList messages={this.props.collection}/>
					</div>
					<ChatForm />
			</div>

		);
	}

});

// the message ul

var MessageList = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	componentDidMount: function() {

	},
	render: function() {
			var messageDetails = this.props.messages.map(function(msg) {
            return (<Message key={msg.cid} msg={msg} />);
            //add key, map over items in collection
        });

        return (
            <ul className='messagesList'>
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
			console.log(messages);
			return (
				 <li className='message'>
                <span className='messageTime'> {this.props.msg.get('sent_time')}</span>
                <span className='username'> {this.props.msg.get('author')}</span>
                <span className='messageText'> {this.props.msg.get('text')}</span>
         	</li>
		);
	}

});

// the form where message is written

var ChatForm = React.createClass({
		mixins: [Backbone.React.Component.mixin],
		handleSubmit: function(e){
			e.preventDefault();
			//object gets passed in
			var chatData = {
				text: $('#usermsg').val() };
			console.log(chatData);
			//
			this.getCollection().create(chatData);
		},

		render: function() {
			return (
				<form onSubmit={this.handleSubmit} name="message">
						<input name="usermsg" type="text" id="usermsg" size="63" />
						<button  name="submitmsg" className="btn btn-success" type="submit" id="submitmsg">Send</button>
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
