var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');

var LogoutPage = React.createClass({

  getInitialState: function() {
    return { errors: [] };
  },
 
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);    
    SessionActionCreators.logout();
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  render: function() {
    return (<div></div>);
  }
});

module.exports = LogoutPage;