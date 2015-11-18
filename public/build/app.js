'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var Message = React.createClass({
  labelType: function labelType() {
    var label = 'label ';
    var type = '';
    switch (this.props.message.level) {
      case 'info':
        type = 'label-info';
        break;
      case 'warning':
        type = 'label-warning';
        break;
      case 'error':
        type = 'label-danger';
        break;
    }
    return label + type;
  },

  render: function render() {
    var message = this.props.message;
    var stacktrace = message.stacktrace ? React.createElement(
      'pre',
      null,
      'Stacktrace: ',
      message.stacktrace
    ) : '';

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-3' },
          'App: ',
          React.createElement(
            'strong',
            null,
            message.app
          )
        ),
        React.createElement(
          'div',
          { className: 'col-md-9' },
          'Level: ',
          React.createElement(
            'strong',
            { className: this.labelType() },
            message.level
          )
        )
      ),
      React.createElement(
        'div',
        null,
        'URL: ',
        message.url
      ),
      React.createElement(
        'div',
        null,
        'Timestamp: ',
        message.timestamp
      ),
      React.createElement(
        'div',
        null,
        'Message: ',
        React.createElement(
          'p',
          null,
          message.message
        )
      ),
      React.createElement(
        'div',
        null,
        stacktrace
      ),
      React.createElement('br', null)
    );
  }
});

var MessageList = React.createClass({
  getInitialState: function getInitialState() {
    return {
      messages: []
    };
  },

  componentDidMount: function componentDidMount() {
    this.loadMessages();
  },

  loadMessages: function loadMessages() {
    var self = this;
    $.get('/logs').done(function (data) {
      self.setState({ messages: data });
    });
  },

  render: function render() {
    var messages = this.state.messages.map(function (message) {
      return React.createElement(Message, { message: message, key: message._id });
    });

    return React.createElement(
      'div',
      null,
      messages
    );
  }
});

ReactDOM.render(React.createElement(
  Router,
  null,
  React.createElement(Route, { path: '/', component: MessageList })
), document.getElementById('app'));