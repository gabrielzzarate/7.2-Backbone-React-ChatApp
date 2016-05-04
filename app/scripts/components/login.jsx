var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var RouterMixin = require('./mixins.js');

var LoginComponent = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	handleChatView: function(e){
		e.preventDefault();
		var userInput = $('#userInput').val();
		var emailInput =$('#emailInput').val();
		this.props.model.set({"username": userInput, "email": emailInput});

		Backbone.history.navigate("chat/" + this.props.model.get("username"), {trigger: true});
	},
	render: function() {

		return (
			<div id="login" className="container-fluid">
		      <div id="intro-panel">

		      </div>
		      <div id="intro-box">
		        <div className="login-box-header">
		          <span className="logo"><i className="fa fa-commenting fa-5x"></i></span>
		          <h1 className="intro-heading">DevChat </h1>
		        	<h4 className="intro-sub-heading">a ChatRoom for Junior Developers</h4>
		        </div>
		        <div id="login-view">
		          <div id="login-form">
		            <form action="/" onSubmit={this.handleChatView} >
		              <label className="usernameLabel" htmlFor="userInput">Enter Username / Password</label>
		              <input type="text" id="userInput"  className="input form-control" name="username" placeholder="username" />
		              <input type="password" id="emailInput"  className="input form-control" name="email" placeholder="password" />
		              <button className="btn btn-default login-button">LOG IN</button>
		            </form>
		          </div>
		       </div>
       </div>
      </div>


		);
	}


});

module.exports = {
	"LoginComponent" : LoginComponent
};
