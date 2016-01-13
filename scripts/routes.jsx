var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var CaloriesApp = require('./components/CaloriesApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var LogoutPage = require('./components/session/LogoutPage.react.jsx')
var MealsPage = require('./components/meals/MealsPage.react.jsx');
var MealPage = require('./components/meals/MealPage.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');

module.exports = (
  <Route name="app" path="/" handler={CaloriesApp}>
    <DefaultRoute handler={MealsPage} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="logout" path="/logout" handler={LogoutPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="meals" path="/meals" handler={MealsPage}/>
    <Route name="meal" path="/meals/:mealId" handler={MealPage} />
  </Route>
);

