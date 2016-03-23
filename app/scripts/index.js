var Firebase = require('firebase');
var myRootRef = new Firebase('https://popping-torch-6591.firebaseio.com/');
require('reactfire');

var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');

//local
var messageModel = require('./models/message.js');
var userModel = require('./models/user.js');
var appComponents = require('./components/chatapp.jsx');
var router = require('./router');



$(function(){
  Backbone.history.start();



});



