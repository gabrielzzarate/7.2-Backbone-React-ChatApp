var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var LoginComponent = React.createClass({
	mixins: [Backbone.React.Component.mixin],
	getInitialState: function() {
		return {
		loginimage:'https://images.unsplash.com/photo-1454165205744-3b78555e5572?crop=entropy&dpr=2&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300'
		};
	},
	handleChatView: function(){

	},
	render: function() {
		var style = {
			loginImage: 'url(' + this.state.loginimage + ')'
		};
		return (
			<div id="login" className="container-fluid" style={style}>
		      <div id="intro-panel">
		        <h1>Chat, 'for' Junior Developers</h1>
		      </div>
		      <div id="intro-box">
		        <div className="login-box-header">
		          <span className="logo"><i className="fa fa-rocket fa-3x"></i></span>
		        </div>
		        <div id="login-view">
		          <div id="login-form">
		            <form action="/" onSubmit={handleChatView}>
		              <label htmlfor="login">Username</label>
		              <input type="text" id="login"  className="form-control" name="username" placeholder="username" />
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
