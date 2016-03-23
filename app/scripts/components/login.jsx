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
        Backbone.history.navigate("chat/" , {trigger: true});
      }
    });


	},
	getData: function(event){
		event.preventDefault();

    $.ajax('https://popping-torch-6591.firebaseio.com/menu.json?auth=' + auth).then(function(data){
      console.log(data);
    });

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
		            <form action="/" onSubmit={this.handleLogin} >
		              <label className="usernameLabel" htmlFor="userInput">Enter Username</label>
		              <input type="text" id="emailInput"  className="form-control" name="email" placeholder="email address" />
		              <input type="password" id="passwordInput"  className="form-control" name="password" placeholder="password" />
		              <button className="btn btn-default login-button">LOG IN</button>
		              <button onClick={this.getData} className="btn btn-success">Get Data</button>
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
