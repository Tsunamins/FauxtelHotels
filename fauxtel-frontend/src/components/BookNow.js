import React from 'react';
import { Helmet } from 'react-helmet';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../styles/booknow.css'
import { connect } from 'react-redux'
import { getRooms } from '../actions/getRooms.js'
import { getReservations } from '../actions/reservations.js'
import BookRooms from './BookRooms.js'
//import { setDates } from '../actions/buildReservation.js'


class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleShowRooms = this.handleShowRooms.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  componentDidMount(){
    this.props.getRooms()
    this.props.getReservations()
    
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
      rooms: [],
      
   

    };
  }

  isSelectingFirstDay(from, to, day) {
    // todo DateUtils not found in latest react day picker
    // const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    // return !from || isBeforeFirstDay || isRangeSelected;
    return !from || isRangeSelected
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

  //remember only showing location 1 for now
  handleShowRooms(){
  
    const { from, to } = this.state;
    const reservations = this.props.reservations
  
    const rooms = this.props.rooms.rooms
    let date_range = toDateRange(from, to)
    sessionStorage.setItem("date_range", date_range)
    sessionStorage.setItem("start_date", from)
    sessionStorage.setItem("end_date", to)

    let no_conflict_found = determineConflicts(date_range, reservations, false)
    let conflict_found = determineConflicts(date_range, reservations, true)

    const intersection = conflict_found.filter(element => no_conflict_found.includes(element));
   
    let actual_available_rooms = removeUnavailable(no_conflict_found, intersection)
    let matches1 = matchAvailaleRoomIds(actual_available_rooms, rooms)
    let matches2 = roomsNoReservations(rooms)
    let allMatches = matches1.concat(matches2)

    //how above was thought out:
    //from what "can" be booked, in theory in no_conflict_found - line 87
    //I must subtract from no_conflict_found what "cannot" be booked found in the intersection array line 93
 

    this.setState({
      rooms: allMatches,
    })
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
 
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
            <div class="SelectionText">
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from && to && `Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}{' '}
               
                {from && to && (
                    <button className="button" onClick={this.handleResetClick}>
                                                    Reset
                    </button>
                )}

                {from && to && (        //(from, to, reservations, rooms)
                    <button className="button" onClick={this.handleShowRooms}> 
                                Show Rooms
                    </button>
                )}
            </div>
           
            <BookRooms availRooms={this.state.rooms} />
            <br></br>

            <Helmet>
              <style>
                  {
                    `.Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                          background-color: #856d8a !important;
                          color: #fbf2fc;
                      }
                      .Range .DayPicker-Day {
                          border-radius: 25 !important;
                    }`
                  }
              </style>
            </Helmet>
            
            
            <br></br>
           
          
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

function determineConflicts(date_range, reservations, condition){
  let array = []
  for(let i = 0; i < reservations.length; i++){
      //also remember at this time, only location 1 has reservations, so if, later, incorporating room avail, will have to re-filter locations where appl
      
      let date_check = findDateOverlap(date_range, reservations[i].attributes.date_range)
      if (date_check === condition){ //if the findDateOverlap function found no overlap
        array.push(reservations[i].attributes.room_id.toString())
  }
}
  let setArray  = [...new Set(array)].sort((a, b) => {return a - b})  
  return setArray
}

function removeUnavailable(no_conflict_array, intersection_array){
  for(let i = 0; i < intersection_array.length; i++){
      let index = no_conflict_array.indexOf(intersection_array[i])
      if(index > -1){
        no_conflict_array.splice(index, 1)
      }
  }
  
  return no_conflict_array
}

function findDateOverlap(date_range, just_res_array) { 
  return date_range.some(item => just_res_array.includes(item)) 
} 

function matchAvailaleRoomIds(actual_available_rooms, rooms){
  //match reservation room_id's with room.id of all rooms
  let room_available = []
  for(let i = 0; i < actual_available_rooms.length; i++){
     
     for(let j = 0; j < actual_available_rooms.length; j++){
    
      if(actual_available_rooms[i] === rooms[j].id){
    
        room_available.push(rooms[i])
       }
    }
  }
  return room_available
}

function roomsNoReservations(rooms){
  //using extra loop to filter out location 1 for now, would modify if adding more locations to expand app later, or even add additional param to specify location
  let loc1 = []
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].attributes.location_id === 1){
      loc1.push(rooms[i])
    }
  }
  let room_available = []
  for(let j = 0; j < loc1.length; j++){
    if(loc1[j].attributes.reservations.length < 1){
      room_available.push(loc1[j])
    }
  }
  return room_available
}


const mapStateToProps = state => {
  return {
    //dates: state.buildReservation.dates,
    rooms: state.rooms,
    
  }
}

  const mapDispatchToProps = dispatch => {
      return {
        getRooms: () => { dispatch(getRooms()) },
        getReservations: () => { dispatch(getReservations()) }
      }
  }



        
export default connect(mapStateToProps, mapDispatchToProps)(BookNow)

