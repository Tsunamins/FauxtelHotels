import React from 'react';
import {Helmet} from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './booknow.css'
var moment = require('moment');
    moment().format();

export default class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }

  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  handleShowRooms(from, to, reservations){

    let reservation_build = toDateRange(from, to)
    console.log(reservation_build)
    sessionStorage.setItem("reservation_build", reservation_build)



    let found = findAvailability(reservation_build, reservations)
    //console.log(found)

    
  
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const reservations = this.props.rooms.reservations
    const today = new Date();
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from, before: today  };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
        <div>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
        
        <button className="link" onClick={this.handleShowRooms(from, to, reservations)}>
          Show Rooms
        </button>
      )}
          {from && to && (
        
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </div>
        <Helmet>
          <style>{`
  .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Range .DayPicker-Day {
    border-radius: 25 !important;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}

const toDateRange = function(start, end){
  let rangeArray = new Array()
  let formatArray = []
  
  //example if need to make a new date dt = new Date(start), make the start and end dates based on customer input, perhaps
  let dateBase = new Date(start)
  while (dateBase <= end){
      rangeArray.push(new Date (dateBase))
      dateBase.setDate(dateBase.getDate() + 1)
  }
  for(let i = 0; i < rangeArray.length; i++){
    formatArray.push(rangeArray[i].toISOString().split('T')[0])
  }
  return formatArray
}

function findAvailability(reservation_build, reservations){
  let overlap_detected = []
  
  for(let i = 0; i < reservations.length; i++){
      //so finds when there is date overlap - returns true - so "true" means room will not be available
      //returns false when there is no date overlap and the rooms would be available
      //also remember at this time, only location 1 has reservations, so if, later, incorporating room avail, will have to re-filter locations where appl
      console.log(findDateOverlap(reservation_build, reservations[i].date_range))
  
     
    
  }
  console.log(overlap_detected)
}

function findDateOverlap(reservation_build, just_res_array) { 
  return reservation_build.some(item => just_res_array.includes(item)) 
} 




//export default BookNow
        
//export default connect(null, {getRooms})(BookNow)

