var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveEditCalories: function(json,errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EDIT_CALORIES,
      json: json,
      errors: errors
    });
  },

  receiveLogout: function(json, errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.LOGOUT_RESPONSE
    });
  },

  receiveMeals: function(json) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEALS,
      json: json
    });
  },

  receiveMeal: function(json) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEAL,
      json: json
    });
  },
  
  receiveCreatedMeal: function(json, errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_MEAL,
      json: json,
      errors: errors
    });
  },

  receiveEditedMeal: function(json, errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EDITED_MEAL,
      json: json,
      errors: errors
    });
  },

  receiveDeleteMeal: function(json, errors) {
    CaloriesAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DELETE_MEAL
    });
  }

  
};

