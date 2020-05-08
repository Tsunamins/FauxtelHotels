import React from 'react';
import {Helmet} from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './booknow.css'
var moment = require('moment');
    moment().format();

class BookNow extends React.Component {
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

  handleShowRooms(from, to, rooms){
    console.log(from)
    console.log(to)
    console.log(rooms)

    let reservation_build = toDateRange(from, to)
    console.log(reservation_build)

    sessionStorage.setItem("reservation_build", reservation_build)

    let found = findAvailability(reservation_build, rooms)
    console.log(found)

    
    console.log("Doing something here to show rooms")
  
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const rooms = this.props.rooms.rooms
    console.log(rooms)
    const today = new Date();
    console.log(today)
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
        
        <button className="link" onClick={this.handleShowRooms(from, to, rooms)}>
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
  //example if need to make a new date dt = new Date(start), make the start and end dates based on customer input, perhaps
  let dateBase = new Date(start)
  while (dateBase <= end){
      rangeArray.push(new Date (dateBase))
      dateBase.setDate(dateBase.getDate() + 1)
  }
  return rangeArray
}

function findAvailability(reservation_build, rooms){
  let uniqueRooms = []
  let matches = []

  //prob won't need no_matches, unles keeping for some other purpose
  let no_matches = []

  for(let i = 0; i < rooms.length; i++){
    let combined_dates = reservation_build.concat(rooms[i].attributes.reservations.date_range).sort()
    for(let j = 0; j < combined_dates.length; j++){
        if(moment(combined_dates[j]).isSame(combined_dates[j+1])){
          //prob won't need no_matches, unless for some future purpose so will propb want to reverse logic in start of if to be a ! match of some kind
          no_matches.push(rooms[j])
        } else {
          matches.push(rooms[i])
          uniqueRooms = [...new Set(matches)]
        }
    }
  }
  return uniqueRooms
}

export default BookNow
        
//export default connect(null, {getRooms})(BookNow)

