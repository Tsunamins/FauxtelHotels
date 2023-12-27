import React, { useEffect, useState } from 'react';

import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import '../styles/booknow.css';
import { getRooms } from '../actions/getRooms.js';
import { getReservations } from '../actions/reservations.js';
import BookRooms from './BookRooms.js'
// todo based on new day picker implmentation is this needed???
//import { setDates } from '../actions/buildReservation.js'

export const BookNow = (props) => {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms);
    const reservations = useSelector(state => state.reservations);

    // new per latest docs
    const defaultSelected = {
        from: null,
        to: null
      };
      const [range, setRange] = useState(defaultSelected);
    const [roomsMatch, setRoomsMatch] = useState(rooms);

    // have to have this until replacing with use effect
    useEffect(() => {
        dispatch(getRooms())
        dispatch(getReservations())
        // dispatch(getCurrentUser())
    }, []);

    const handleShowRooms = () => {
  
    const { from, to } = range;
    let dateRange = toDateRange(from, to)
    // todo also based on new day picker implementatikon is this needed???
    sessionStorage.setItem("date_range", dateRange)
    sessionStorage.setItem("start_date", from)
    sessionStorage.setItem("end_date", to)

    let noConflict = determineConflicts(dateRange, reservations, false);
    let conflict = determineConflicts(dateRange, reservations, true);

    const intersection = conflict.filter(element => noConflict.includes(element));
   
    let availableRooms = removeUnavailable(noConflict, intersection);
    let matches1 = matchAvailableRoomIds(availableRooms, rooms);
    let matches2 = roomsNoReservations(rooms);
    let allMatches = matches1.concat(matches2);

    setRoomsMatch(
        allMatches
    )
}

    const handleResetClick = () => {
        setRange(defaultSelected)
    }

    // todo don't need all of these maybe but make sure ranges can't be set before today in new day picker
    // const today = new Date();
    // const { from, to, enteredTo } = datesToRooms;
    // const modifiers = { start: from, end: enteredTo };
    // const disabledDays = { before: datesToRooms.from, before: today  };
    // const selectedDays = [from, { from, to: enteredTo }];

    return (
        <div>
        <DayPicker 
            className="Range"
            mode='range'
            numberOfMonths={2}
            //   fromMonth={from}
            //   defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
        />
            <div class="SelectionText Instructions">
                {!range.from && !range.to && 'Please select the first day.'}
                {range.from && !range.to && 'Please select the last day.'}
                {range.from && range.to && `Selected from ${range.from.toLocaleDateString()} to ${range.to.toLocaleDateString()}`}{' '}
                
                {range.from && range.to && (
                    <button className="button" onClick={handleResetClick}>Reset</button>
                )}

                {range.from && range.to && (
                    <button className="button" onClick={handleShowRooms}>Show Rooms</button>
                )}
            </div>
            
            <BookRooms availRooms={roomsMatch} />
            <br />
        </div>
    );
}


const toDateRange = function(start, end){
    let rangeArray = new Array()
    let formatArray = []
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

function determineConflicts(dateRange, reservations, condition){
    let array = []
    for(let i = 0; i < reservations.length; i++){      
        let dateCheck = findDateOverlap(dateRange, reservations[i].attributes.date_range)
        if (dateCheck === condition){ //if the findDateOverlap function found no overlap
            array.push(reservations[i].attributes.room_id.toString())
        }
    }
    let setArray  = [...new Set(array)].sort((a, b) => {return a - b})  
    return setArray
}

function removeUnavailable(noConflictArray, intersectionArray){
    for(let i = 0; i < intersectionArray.length; i++){
        let index = noConflictArray.indexOf(intersectionArray[i])
        if(index > -1){
            noConflictArray.splice(index, 1)
        }
    }
  
    return noConflictArray
}

function findDateOverlap(dateRange, justResArray) { 
  return dateRange.some(item => justResArray.includes(item)) 
} 

function matchAvailableRoomIds(actualAvailableRooms, rooms){
    //match reservation room_id's with room.id of all rooms
    let roomAvailable = []
    for(let i = 0; i < actualAvailableRooms.length; i++){
     
        for(let j = 0; j < actualAvailableRooms.length; j++){
    
            if(actualAvailableRooms[i] === rooms[j].id){
    
                roomAvailable.push(rooms[i])
            }
        }
    }
    return roomAvailable
}

function roomsNoReservations(rooms){
    // checking all available rooms all at all locations for now
    // add feature to select location
    const roomsCheck = rooms.rooms;
    // todo change to filter/map
    let roomAvailable = []
    for(let j = 0; j < roomsCheck.length; j++){
        if(roomsCheck[j].attributes.reservations.length < 1){
            roomAvailable.push(roomsCheck[j])
        }
    }
  return roomAvailable
}
