var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  signup: function(email, password, passwordConfirmation) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, password, passwordConfirmation);
  },

  login: function(email, password) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  editCalories: function(calories) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.EDIT_CALORIES,
      calories: calories
    });
    WebAPIUtils.editCalories(calories);
  },

  logout: function() {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT_REQUEST
    });
    WebAPIUtils.logout();
  }
  
};

