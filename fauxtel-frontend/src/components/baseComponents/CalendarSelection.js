import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../styles/BookNow.css';

export const CalendarSelection = ({ incomingDate, dateRangePoint, isModing, range, setShowCalendar, setRange }) => {
    const today = new Date();
    const modingDate = new Date(dateRangePoint === 'Begin' ? range.from: range.to);
    // todo change all from and to in ranges to Begin and Conclude or begin and conclude to avoid all these checks
    const [selected, setSelected] = useState(dateRangePoint === 'Begin' ? range.from : range.to);
    const [monthStart, setMonthStart] = useState(isModing ? modingDate : today);


    const handleConfirm = () => {
        let updatedRange = range;
        const updateDate = dateRangePoint === 'Begin' ? 'from' : 'to'
        updatedRange[updateDate] = selected;
        setRange(updatedRange)
        setShowCalendar(false)
    }

    let footer = <p>Select {dateRangePoint === 'Begin' ? 'Beginning' : 'Conclusion' } of stay.</p>;
    if (selected) {
      footer = <p className="calendarFooter"><button className='dateConfirm calendarButton' onClick={handleConfirm}>{dateRangePoint} stay on {format(selected, 'PP')}</button></p>;
    }
    // todo here or in parent - handle click outside to close, escape to close
    return (
        <div className='calendarModal'>
            <div className='calendarCentered'>
                <button className='calendarButton' onClick={() => setShowCalendar(false)}>Close</button>      
                <DayPicker
                    disabled={{ before: today }}
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                    defaultMonth={monthStart}
                />
            </div>
        </div>
    );
};
