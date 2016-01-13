var React = require('react');
var AriaModal = require('react-aria-modal');
var moment = require('moment');

var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var request = require('superagent');
var SmallConstants = require('../../constants/SmallConstants.js');
var MealStore = require('../../stores/MealStore.react.jsx');
var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');
var State = require('react-router').State;

var APIEndpoints = SmallConstants.APIEndpoints;
var EditMealModal = React.createClass({

  mixins: [ State ],

  getInitialState: function() {
    return { 
      modalActive: false,
      meal: MealStore.getMeal(), 
      errors: []
    };
  },

  saveMeal: function(json) {
    this.setState({ meal: json.meal});
  },

  activateModal: function() {
    var id = this.props.id;  
    var meal; 
    var that = this;
    request.get(APIEndpoints.MEALS + '/' + id)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
          meal = JSON.parse(res.text);
          that.saveMeal(meal);
      });
      
    setTimeout(function(){ that.setState({ modalActive: true }); }, 100);
    
  },

  deactivateModal: function() {
    this.setState({ modalActive: false });
  },

  deleteMeal: function(e) {
    e.preventDefault();
    MealActionCreators.deleteMeal(this.props.id);
    this.setState({ modalActive: false });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var date = this.refs.date.getDOMNode().value;
    var time = this.refs.time.getDOMNode().value;
    var calories = this.refs.calories.getDOMNode().value;
    MealActionCreators.editMeal(this.props.id, name, date, time, calories);
    this.setState({ modalActive: false });
  },

  render: function() {
    return (
      <div>
        <button className="editButton" onClick={this.activateModal}>
          Edit
        </button>
        <AriaModal
          titleText="EditMealModal"
          mounted={this.state.modalActive}          
          onExit={this.deactivateModal}
        >
          <div className='modal-dialog'>
            <div className="row">
              <form onSubmit={this._onSubmit} className="new-meal">
                <div className="new-meal__name">
                  <input type="text" name="name" ref="name" defaultValue={this.state.meal.name}  required="required"/> 
                </div>
                <div className="new-meal__date">
                  <input type="date" name="date" ref="date" defaultValue={moment.utc(this.state.meal.date).format("YYYY-MM-DD")} pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$" title="Date format should be YYYY-MM-DD" required="required" /> 
                </div>
                <div className="new-meal__time">
                  <input type="time" name="time" ref="time" defaultValue={moment.utc(this.state.meal.time).format("HH:mm")} pattern="^(1?[0-9]|2[0-3]):[0-5][0-9]$" title="Date format should be HH:MM" required="required" /> 
                </div>
                <div className="new-meal__calories">
                  <input type="number" min="0" name="calories" ref="calories" defaultValue={this.state.meal.calories} required="required"/> 
                </div>
                <div className="new-meal__submit">
                  <button type="submit">Edit</button>
                </div> 
                <div className="new-meal__delete">
                  <button id='demo-one-deactivate' onClick={this.deleteMeal} >Delete</button>
                </div> 
               </form>
             </div>
          </div>
        </AriaModal>
      </div>
    )
  },
});

module.exports = EditMealModal;