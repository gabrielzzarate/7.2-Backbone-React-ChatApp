var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');
var Firebase = require('firebase');



var ref = new Firebase("https://popping-torch-6591.firebaseio.com/");
var auth;

var RouterMixin = require('./mixins.js');

var LoginComponent = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	handleLogin: function(e){
		e.preventDefault();

  	 var emailInput = $('#emailInput').val();
		 var passwordInput =$('#passwordInput').val();

    ref.authWithPassword({"email": emailInput, "password": passwordInput }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth = authData.token;
        localStorage.setItem('username', authData.password.email);
        Backbone.history.navigate("chat/" , {trigger: true});
      }
    });
	},
	handleNewUser: function(e){
		e.preventDefault();
		var newEmailInput = $('#newEmailInput').val();
		var newPasswordInput = $('#newPasswordInput').val();

		ref.createUser({"email": newEmailInput, "password": newPasswordInput}, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

	},
	render: function() {

		return (
			<div className="login-screen">
			<div id="login" className="container-fluid">
		      <div id="intro-panel">

		      </div>
		      <div id="intro-box">
		        <div className="login-box-header">
		          <span className="logo"><i className="fa fa-commenting fa-5x"></i></span>
		          <h1 className="intro-heading">DevChat</h1>
		        	<h4 className="intro-sub-heading">a ChatRoom for Junior Developers</h4>
		        </div>
		        <div id="login-view">
		          <div id="login-form">
		            <form action="/" onSubmit={this.handleLogin} >
		              <label className="usernameLabel" htmlFor="userInput">Enter Username</label>
		              <input type="text" id="emailInput"  className="form-control" name="email" placeholder="email address" />
		              <input type="password" id="passwordInput"  className="form-control" name="password" placeholder="password" />
		              <button className="btn btn-default login-button">LOG IN</button>

		            </form>
		          </div>
		       </div>
		       </div>
		       <div className="col-md-6 new-user-container">
		          <div id="new-user-form">
		            <form action="/" onSubmit={this.handleNewUser} >
		              <label className="newUserLabel" htmlFor="userInput">Sign Up For DevChat!</label>
		              <input type="text" id="newEmailInput"  className="form-control" name="email" placeholder="email address" />
		              <input type="password" id="newPasswordInput"  className="form-control" name="password" placeholder="password" />
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
