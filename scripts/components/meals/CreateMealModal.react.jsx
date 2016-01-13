var React = require('react');
var AriaModal = require('react-aria-modal');
var moment = require('moment');

var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');

var CreateMealModal = React.createClass({
  getInitialState: function() {
    return { modalActive: false };
  },

  activateModal: function() {
    this.setState({ modalActive: true });
  },

  deactivateModal: function() {
    this.setState({ modalActive: false });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var date = this.refs.date.getDOMNode().value;
    var time = this.refs.time.getDOMNode().value;
    var calories = this.refs.calories.getDOMNode().value;
    MealActionCreators.createMeal(name, date, time, calories);
    this.setState({ modalActive: false });
  },

  render: function() {
    return (
      <div className="left">
        <button onClick={this.activateModal}>
          New meal
        </button>
        <AriaModal
          titleText="CreateMealModal"
          mounted={this.state.modalActive}          
          onExit={this.deactivateModal}
        >
          <div className='modal-dialog'>
            <div className="row">
              <form onSubmit={this._onSubmit} className="new-meal">
                <div className="new-meal__name">
                  <input type="text" placeholder="Name" name="name" ref="name" required="required"/> 
                </div>
                <div className="new-meal__date">
                  <input type="date" placeholder="Date" name="date" ref="date" defaultValue={moment().format("YYYY-MM-DD") } pattern="^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$" title="Date format should be YYYY-MM-DD" required="required" /> 
                </div>
                <div className="new-meal__time">
                  <input type="time" placeholder="Time" name="time" ref="time" defaultValue={moment().format("HH:mm") } pattern="^(1?[0-9]|2[0-3]):[0-5][0-9]$" title="Date format should be HH:MM" required="required" /> 
                </div>
                <div className="new-meal__calories">
                  <input type="number" min="0" placeholder="Calories" name="calories" ref="calories" required="required"/> 
                </div>
                <div className="new-meal__submit">
                  <button type="submit">Create</button>
                </div>
                <div className="new-meal__cancel">
                  <button id='demo-one-deactivate' onClick={this.deactivateModal} >Cancel</button>
                </div>  
               </form>
             </div>
          </div>
        </AriaModal>
      </div>
    )
  },
});

module.exports = CreateMealModal;