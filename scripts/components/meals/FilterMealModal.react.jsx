var React = require('react');
var AriaModal = require('react-aria-modal');
var moment = require('moment');

var MealActionCreators = require('../../actions/MealActionCreators.react.jsx');

var FilterMealModal = React.createClass({
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
    var fromDate = this.refs.fromDate.getDOMNode().value;
    var untilDate = this.refs.untilDate.getDOMNode().value;
    var fromTime = this.refs.fromTime.getDOMNode().value;
    var untilTime = this.refs.untilTime.getDOMNode().value;
    MealActionCreators.loadMeals(fromDate, untilDate, fromTime, untilTime);
    this.setState({ modalActive: false });
  },

  clearFilter: function(e) {
    e.preventDefault();
    MealActionCreators.loadMeals();
    this.setState({ modalActive: false });
  },

  render: function() {
    return (
      <div className='right'>
        <button className='greyButton' onClick={this.activateModal}>
          Filter
        </button>
        <AriaModal
          titleText='FilterMealModal'
          mounted={this.state.modalActive}          
          onExit={this.deactivateModal}
        >
          <div className='modal-dialog'>
            <div className='row'>
              <form onSubmit={this._onSubmit} className='new-meal'>
                <div className='new-meal__fromDate'>
                  <input type='date' placeholder='from Date' name='fromDate' ref='fromDate' defaultValue={moment().format('YYYY-MM-DD') }/> 
                </div>
                <div className='new-meal__untilDate'>
                  <input type='date' placeholder='to Date' name='untilDate' ref='untilDate' defaultValue={moment().format('YYYY-MM-DD') } /> 
                </div>
                <div className='new-meal__fromTime'>
                  <input type='time' placeholder='from Time' name='fromTime' ref='fromTime' defaultValue={moment("0100", "hmm").format('HH:mm') } /> 
                </div>
                <div className='new-meal__untilTime'>
                  <input type='time' min='0' placeholder='to Time' name='untilTime' ref='untilTime' defaultValue={moment("2359", "hmm").format('HH:mm') }/> 
                </div>
                <div className='new-meal__submit'>
                  <button type='submit'>Filter</button>
                </div>
                <div className='new-meal__reset'>
                  <button id='demo-one-deactivate' onClick={this.clearFilter} >Clear Filters </button>
                </div> 
               </form>
             </div>
          </div>
        </AriaModal>
      </div>
    )
  },
});

module.exports = FilterMealModal;