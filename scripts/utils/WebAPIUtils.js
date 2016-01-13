var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var SmallConstants = require('../constants/SmallConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = [json['errors']];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = SmallConstants.APIEndpoints;

module.exports = {

  signup: function(email, password, passwordConfirmation) {
    request.post(APIEndpoints.REGISTRATION)
      .send({ user: { 
        email: email, 
        password: password,
        password_confirmation: passwordConfirmation
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  editCalories: function(calories) {
    request.put(APIEndpoints.REGISTRATION + '/' + sessionStorage.getItem('accessToken'))      
      .set('Accept', 'application/json')      
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ user: { 
        calories: calories
      }})
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveEditCalories(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveEditCalories(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ session: { email: email, password: password} })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  logout: function() {
    request.del(APIEndpoints.LOGIN + '/' + sessionStorage.getItem('accessToken'))
    .set('Accept', 'application/json')
    .end(function(error, res){
      if (res.statusCode == 204) {
        ServerActionCreators.receiveLogout();
      }
    });
  },

  loadMeals: function(fromDate, untilDate, fromTime, untilTime) {
    request.get(APIEndpoints.MEALS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .query({ from_date: fromDate, until_date: untilDate, from_time: fromTime, until_time: untilTime } )
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMeals(json);
        }
      });
  },

  loadMeal: function(MealId) {
    request.get(APIEndpoints.MEALS + '/' + MealId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveMeal(json);
        }
      });
  },

  createMeal: function(name, date, time, calories) {
    request.post(APIEndpoints.MEALS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ meal: { name: name, date: date, time: time, calories: calories } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveCreatedMeal(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveCreatedMeal(json, null);
          }
        }
      });
  },

  editMeal: function(MealId,name, date, time, calories) {
    request.put(APIEndpoints.MEALS + '/' + MealId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ meal: { name: name, date: date, time: time, calories: calories } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveEditedMeal(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveEditedMeal(json, null);
          }
        }
      });
  },

  deleteMeal: function(MealId) {
    request.del(APIEndpoints.MEALS + '/' + MealId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
      if (res.statusCode == 204) {
        ServerActionCreators.receiveDeleteMeal();
      }
    });
  }

};

