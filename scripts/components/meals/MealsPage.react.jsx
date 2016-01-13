var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var MealStore = require('../../stores/MealStore.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');
var ReactDataGrid = require('react-data-grid/addons');

var FilterMeal = require('./FilterMealModal.react.jsx');
var CreateMeal = require('./CreateMealModal.react.jsx');
var CaloriesCounter = require('./CaloriesCounterModal.react.jsx');
var EditMeal = require('./EditMealModal.react.jsx');

var MealsPage = React.createClass({

  getInitialState: function() {
    return { 
      meals: MealStore.getAllMeals(), 
      errors: [],
      logged: false,
      caloriesLimit: null,
      todayCalories: null
    };
  },
 
  componentDidMount: function() {
    MealStore.addChangeListener(this._onChange);
    MealActionCreators.loadMeals();
  },

  componentWillUnmount: function() {
    MealStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      meals: MealStore.getAllMeals(),
      errors: MealStore.getErrors(),
      logged: SessionStore.isLoggedIn(),
      caloriesLimit: SessionStore.getCaloriesLimit(),
      todayCalories: MealStore.getTodayCalories()
    }); 
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div><br/><br/></div>;
    var content = <div></div>
    // Load content if logged in
    if (this.state.logged) {
      content = <div><div className="row">
                  <CreateMeal /> 
                  <CaloriesCounter caloriesLimit={this.state.caloriesLimit} todayCalories={this.state.todayCalories} />   
                  <FilterMeal />
                </div>
                <div className="row">
                  <MealsTable meals={this.state.meals} />
                </div></div>
    }
    return (
      <div>
        {errors}
        {content}
      </div>
    );
  }
});

var MealsTable = React.createClass({
  render: function() {
    var _meals = this.props.meals;
    //A rowGetter function is required by the grid to retrieve a row for a given index
    var rowGetter = function(i){
      return _meals[i];
    };

    //Custom Formatter component
    var TimeFormatter = React.createClass({
      render:function(){
        var time = moment.utc(this.props.value).format("HH:mm");
        return (
          <div >            
            {time}
          </div>);
        }
      });

    var EditFormatter = React.createClass({
      render:function(){
        var mealId = this.props.value;
        return (
          <EditMeal id={mealId} />);
        }
      });


    var columns = [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'date',
      name: 'Date'
    },
    {
      key: 'time',
      name: 'Time',
      formatter: TimeFormatter
    },
    {
      key: 'calories',
      name: 'Calories'
    },
    {
      key: 'id',
      name: '',
      formatter: EditFormatter
    }
    ]
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={this.props.meals.length}
    minHeight={300} />);
  }
});

module.exports = MealsPage;

