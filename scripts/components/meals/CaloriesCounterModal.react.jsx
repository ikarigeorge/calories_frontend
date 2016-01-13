var React = require('react');
var AriaModal = require('react-aria-modal');
var moment = require('moment');

var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var CaloriesCounterModal = React.createClass({
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
    this.setState({ modalActive: false });
    var newLimit = this.refs.newLimit.getDOMNode().value;
    SessionActionCreators.editCalories(newLimit);
  },

  render: function() {
    var colorClass = (this.props.caloriesLimit >= this.props.todayCalories) ? "greenButton" : "redButton";
    return (<div className="right">
      <button className={colorClass} onClick={this.activateModal}>
        Today Calories: {this.props.todayCalories} <br/>
        Limit: {this.props.caloriesLimit}
      </button>
        <AriaModal
          titleText='FilterMealModal'
          mounted={this.state.modalActive}          
          onExit={this.deactivateModal}
        >
          <div className='modal-dialog'>
            <div className='row'>
              <form onSubmit={this._onSubmit} className='edit-calories'>
                <div className='edit-calories__new-limit'>
                  <label>New Daily Limit</label>
                  <input type='text' placeholder='New Daily Limit' name='newLimit' ref='newLimit' defaultValue={this.props.caloriesLimit} pattern="^[0-9]*$" title="Enter only digits" required="required" /> 
                </div>
                <div className='new-meal__submit'>
                  <button type='submit'>Update</button>
                </div>
               </form>
             </div>
          </div>
        </AriaModal>
      </div>
    )
  },
});

module.exports = CaloriesCounterModal;
