var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  loadMeals: function(fromDate, untilDate, fromTime, untilTime) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MEALS
    });
    WebAPIUtils.loadMeals(fromDate, untilDate, fromTime, untilTime);
  },
  
  loadMeal: function(mealId) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MEAL,
      mealId: mealId
    });
    WebAPIUtils.loadMeal(mealId);
  },

  createMeal: function(name, date, time, calories) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MEAL,
      name: name,
      date: date,
      time: time,
      calories: calories
    });
    WebAPIUtils.createMeal(name, date, time, calories);
  },

  editMeal: function(mealId, name, date, time, calories) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.EDIT_MEAL,
      mealId: mealId,
      name: name,
      date: date,
      time: time,
      calories: calories
    });
    WebAPIUtils.editMeal(mealId, name, date, time, calories);
  },

  deleteMeal: function(mealId) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_MEAL,
      mealId: mealId
    });
    WebAPIUtils.deleteMeal(mealId);
  }

};

