var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-react-component');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

//local
var models = require('../models/message.js');
var RouterMixin = require('./mixins.js');


// component that holds the state of the application
var ChatApp = React.createClass({
	mixins: [Backbone.React.Component.mixin, ReactFireMixin],

	componentWillMount: function() {
		//sets the endpoint in Firebase database
		this.bindAsArray(new Firebase("https://popping-torch-6591.firebaseio.com/messages/"), "messages");


		// setInterval(function(){
		// 		this.props.collection.fetch();
		// }.bind(this), 2000);


	},
	handleSubmit: function(text){

  		this.firebaseRefs["messages"].push({ text: text });
  		this.setState({text: ""});
  },

	render: function() {

		return (
			<div id="wrapper" className="chatApp col-md-6 col-md-offset-1">
					<div id="menu">
						<p className="welcome">Hello {localStorage.getItem('username')}, welcome to DevChat!</p>
        		<p className="logout"><a id="exit" href="#">Logout</a></p>
        	</div>


					<div id="chatbox" className="col-md-10 col-md-offset-1">
						<MessageList messages={this.props.collection} fireBaseMessages={this.state.messages} />
					</div>
					<ChatForm model={this.props.model} handleSubmit={this.handleSubmit}/>
			</div>

		);
	}

});

// the message ul

var MessageList = React.createClass({
	mixins: [Backbone.React.Component.mixin, ReactFireMixin],

	render: function() {

			var messageDetails = this.props.fireBaseMessages.map(function(message) {
				console.log("message" , message);

            return (<Message key={message.cid} message={message} />);

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
	mixins: [Backbone.React.Component.mixin, ReactFireMixin],
	render: function() {


			return (

				 <li className='message'>

                <span className='messageText'> {this.props.message.text}</span>
         	</li>
		);
	}
});

// the form where message is written

var ChatForm = React.createClass({
		mixins: [Backbone.React.Component.mixin, ReactFireMixin],
		getInitialState: function(){
    return {
      text: ''
    };
  },
		handleSubmit: function(e){
			e.preventDefault();
			var text = this.state.text;
			this.props.handleSubmit(text);
  		this.setState({text: ""});

			// e.preventDefault();
			// var date = new Date();
			// var chatData = {

			// 	content: $('#usermsg').val(),
			// 	username: this.props.model.get("username"),
			// 	time: date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2),
			// 	user_avatar: this.props.model.get("user_avatar")




			// console.log(chatData);

			// this.getCollection().create(chatData);
			// $('#usermsg').val('');

		},
		handleText: function(e){
			e.preventDefault();
			this.setState({text: e.target.value});
		},

		render: function() {
			return (
				<form onSubmit={this.handleSubmit} name="message">
						<input onChange={this.handleText} value={this.state.text} name="usermsg" type="text" id="usermsg" size="63" />
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
