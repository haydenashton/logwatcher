var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;


var Message = React.createClass({
  labelType: function() {
    var label = 'label ';
    var type = ''
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

  render: function() {
    var message = this.props.message;
    var stacktrace = message.stacktrace ? <pre>Stacktrace: {message.stacktrace}</pre> : '';

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            App: <strong>{message.app}</strong>
          </div>
          <div className="col-md-9">
            Level: <strong className={this.labelType()}>{message.level}</strong>
          </div>
        </div>
        <div>
          URL: {message.url}
        </div>
        <div>
          Timestamp: {message.timestamp}
        </div>
        <div>
          Message: <p>{message.message}</p>
        </div>
        <div>
          {stacktrace}
        </div>
        <br/>
      </div>
    );
  }
});


var MessageList = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentDidMount: function() {
    this.loadMessages();
  },

  loadMessages: function() {
    var self = this;
    $.get('/logs').done(function(data) {
      self.setState({messages: data});
    });
  },

  render: function() {
    var messages = this.state.messages.map(function(message) {
      return <Message message={message} key={message._id} />
    });

    return <div>{messages}</div>
  }
});

ReactDOM.render(
  <Router>
    <Route path="/" component={MessageList}/>
  </Router>, document.getElementById('app'));
