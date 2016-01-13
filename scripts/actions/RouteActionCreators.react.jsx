var CaloriesAppDispatcher = require('../dispatcher/CaloriesAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    CaloriesAppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


