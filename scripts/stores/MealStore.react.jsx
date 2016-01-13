var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var moment = require('moment');

var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _meals = [];
var _errors = [];
var _meal = { name: "", date: "", time: "", calories: "" };

var MealStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT); 
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMeals: function() {
    return _meals;
  },

  getMeal: function() {
    return _meal;
  },

  getTodayCalories: function() {
    if (_meals) {
    return _meals.reduce(function(prev, curr, index){
        var cal = moment().isSame(_meals[index].date, 'day') ? _meals[index].calories : 0;
        return prev + cal;
      },0)
    }
  },

  getErrors: function() {
    return _errors;
  }

});

MealStore.dispatchToken = CaloriesAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    
    case ActionTypes.RECEIVE_MEALS:
      _meals = action.json.meals;
      MealStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_MEAL:
      if (action.json) {
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MealStore.emitChange();
      WebAPIUtils.loadMeals();   
      break;

    case ActionTypes.RECEIVE_EDITED_MEAL:
    case ActionTypes.RECEIVE_DELETE_MEAL:
      WebAPIUtils.loadMeals();
      break; 
    
    case ActionTypes.RECEIVE_EDIT_CALORIES:
      MealStore.emitChange();
      break;

    case ActionTypes.RECEIVE_MEAL:
      if (action.json) {
        _meal = action.json.meal;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      MealStore.emitChange();
      break;
  }

  return true;
});

module.exports = MealStore;

