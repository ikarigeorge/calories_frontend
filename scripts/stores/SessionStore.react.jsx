var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _email = sessionStorage.getItem('email');
var _caloriesLimit = sessionStorage.getItem('caloriesLimit');
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;    
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getEmail: function() {
    return _email;
  },

  getCaloriesLimit: function() {
    return _caloriesLimit;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = CaloriesAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (action.json && action.json.user.auth_token) {
        _accessToken = action.json.user.auth_token;
        _email = action.json.user.email;
        _caloriesLimit = action.json.user.calories;
        // Token will always live in the session, so that the API can grab it with no hassle
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('email', _email);
        sessionStorage.setItem('caloriesLimit', _caloriesLimit);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_EDIT_CALORIES:
      if (action.json) {
        _caloriesLimit = action.json.user.calories;
        sessionStorage.setItem('caloriesLimit', _caloriesLimit);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      _accessToken = null;
      _email = null;
      _caloriesLimit = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('caloriesLimit');
      SessionStore.emitChange();
      break;

    default:
  }
  
  return true;
});

module.exports = SessionStore;

