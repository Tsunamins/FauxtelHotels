import React, { Dispatch } from 'react';
import '../../styles/BookNow.css';
import { day, month } from '../../constants.ts';
import { DateSelectionProps } from './baseComponentProps';



export const DateSelection = ({ dateSelected, dateRangePoint, setShowCalendar, showCalendar }: DateSelectionProps) => {
    const monthDisplay = dateSelected && month[dateSelected.getMonth()];
    const dayDisplay = dateSelected && day[dateSelected.getDay()];
    const dateNumber = dateSelected && dateSelected.getDate();

    return (
        <div className={dateSelected ? 'dateSelectedBox' : 'dateSelectionBox'} onClick={() => setShowCalendar(!showCalendar)}>
            <div className='daySelectionContent'>
                {dateSelected && <div className='monthDisplay'>{monthDisplay}</div>}
                <div className={`stayDisplay cursiveFont ${dateSelected ? 'staySize' : 'selectionSize'}`}>{dateSelected ? dateNumber : dateRangePoint}</div>
                {!dateSelected && <div className='stayDisplay selectionSize indent cursiveFont'>Stay</div>}
                {dateSelected && <div className='dayDisplay'>{dayDisplay}</div>}
            </div>
        </div>
    );
};