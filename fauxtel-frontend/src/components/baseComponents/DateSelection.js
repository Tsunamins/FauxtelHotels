import React from 'react';
import '../../styles/BookNow.css';
import { day, month } from '../../constants';

export const DateSelection = ({ dateSelected, dateRangePoint, setShowCalendar, showCalendar }) => {
    const monthDisplay = dateSelected && month[dateSelected.getMonth()];
    const dayDisplay = dateSelected && day[dateSelected.getDay()];
    const dateNumber = dateSelected && dateSelected.getDate();

    console.log('date selection ?? ', dateSelected)
    // range display will be start or end of date range to display
    // i.e. Start Stay / Start Date
    const handleClick = () => {
        setShowCalendar(!showCalendar)
    }
    return (
        // todo onclick will open up a calendar view of react day picker
        <div className={dateSelected ? 'dateSelectedBox' : 'dateSelectionBox'} onClick={handleClick}>
            {/* todo this div will be for a mini calendar display conditionally shown*/}
            <div className='daySelectionContent'>
                {dateSelected && <div className='monthDisplay'>{monthDisplay}</div>}
                <div className={`stayDisplay cursiveFont ${dateSelected ? 'staySize' : 'selectionSize'}`}>{dateSelected ? dateNumber : dateRangePoint}</div>
                {!dateSelected && <div className='stayDisplay selectionSize indent cursiveFont'>Stay</div>}
                {dateSelected && <div className='dayDisplay'>{dayDisplay}</div>}
            </div>
        </div>
    );
};