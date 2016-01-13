var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MealStore = require('../../stores/MealStore.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var State = require('react-router').State;

var MealPage = React.createClass({
  
  mixins: [ State ],

  getInitialState: function() {
    return { 
      meal: MealStore.getMeal(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    MealStore.addChangeListener(this._onChange);
    MealActionCreators.loadMeal(this.getParams().mealId);
  },

  componentWillUnmount: function() {
    MealStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      meal: MealStore.getMeal(),
      errors: MealStore.getErrors()
    }); 
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="meal__name">{this.state.meal.name}</div>
        <div className="meal__date">{this.state.meal.date}</div>
        <div className="meal__time">{this.state.meal.time}</div>
        <div className="meal__calories">{this.state.meal.calories}</div>
      </div>
     );
  }

});

module.exports = MealPage;

