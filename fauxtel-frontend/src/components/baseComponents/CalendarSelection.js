import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../styles/BookNow.css';

export const CalendarSelection = ({ incomingDate, dateRangePoint, range, setShowCalendar, setRange }) => {
    const [selected, setSelected] = useState();

    const today = new Date();

    const handleConfirm = () => {
        let updatedRange = range;
        const updateDate = dateRangePoint === 'Begin' ? 'from' : 'to'
        updatedRange[updateDate] = selected;
        setRange(updatedRange)
        setShowCalendar(false)
    }


    let footer = <p>Select {dateRangePoint} of stay.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, 'PP')}. <button className='dateConfirm' onClick={handleConfirm}>Confirm</button></p>;
    }
    // todo here or in parent - handle click outside to close, escape to close
    return (
        <div className='calendarModal'>
            <div className='calendarCentered'>
                <button onClick={() => setShowCalendar(false)}>Close</button>      
                <DayPicker
                    disabled={{ before: today }}
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                />
            </div>
        </div>
    );
};
