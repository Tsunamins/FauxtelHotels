import React from 'react';
import {Helmet} from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './booknow.css'
import { connect } from 'react-redux'
import { getRooms } from '../actions/getRooms.js'
import { getReservations } from '../actions/reservations.js'


class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  componentDidMount(){
    this.props.getRooms()
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

  handleShowRooms(from, to, reservations, rooms){

    let reservation_build = toDateRange(from, to)
    sessionStorage.setItem("reservation_build", reservation_build)
    let no_conflict_room_ids = determineAvailability(reservation_build, reservations)
    let match1 = matchAvailableRooms(no_conflict_room_ids, rooms)
    let match2 = roomsNoReservations(rooms)






    
  
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const rooms = this.props.rooms.rooms
    const reservations = this.props.reservations.reservations
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
        
        <button className="link" onClick={this.handleShowRooms(from, to, reservations, rooms)}>
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

function determineAvailability(reservation_build, reservations){
  let no_conflict = []
  let isolate_room_id = []
  for(let i = 0; i < reservations.length; i++){
      //so finds when there is date overlap - returns true - so "true" means room will not be available
      //returns false when there is no date overlap and the rooms would be available
      //also remember at this time, only location 1 has reservations, so if, later, incorporating room avail, will have to re-filter locations where appl
      let date_check = findDateOverlap(reservation_build, reservations[i].date_range)
      if (date_check === false){
        no_conflict.push(reservations[i])
        isolate_room_id.push(reservations[i].room_id.toString())
      }
  }
  return isolate_room_id
}

function findDateOverlap(reservation_build, just_res_array) { 
  return reservation_build.some(item => just_res_array.includes(item)) 
} 

function matchAvailableRooms(no_conflict_room_ids, rooms){
  //match reservation room_id's with room.id of all rooms
  let room_available = []
  for(let i = 0; i < no_conflict_room_ids.length; i++){
    
    for(let j = 0; j < no_conflict_room_ids.length; j++){
      console.log(typeof no_conflict_room_ids[i])
      console.log(typeof rooms[j].id)
      if(no_conflict_room_ids[i] === rooms[j].id){
        room_available.push(rooms[i])
      }
    }
  }
  console.log(room_available)
  return room_available
}

function roomsNoReservations(rooms){

  //using extra loop to filter out location 1 for now, would modify if adding more locations to expand app later, or even add additional param to specify location
  let loc1 = []
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].attributes.location_id === 1){
      loc1.push(rooms[i])
    }

    console.log(rooms[i].attributes.location_id)
    console.log(rooms[i].attributes.reservations) //prob looking to filter where array.length is < 1
  }

  let room_available = []
  for(let j = 0; j < loc1.length; j++){
    if(loc1[j].attributes.reservations.length < 1){
      room_available.push(loc1[j])
    }
  }
  console.log(room_available)
  return (room_available)
}







const mapStateToProps = state => {
  return {
    //reservations: state.reservations,
    rooms: state.rooms,
    
  }
}

  const mapDispatchToProps = dispatch => {
      return {
        getRooms: () => { dispatch(getRooms()) },
      }
  }


//export default BookNow
        
export default connect(mapStateToProps, mapDispatchToProps)(BookNow)

