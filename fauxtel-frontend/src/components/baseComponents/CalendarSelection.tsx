import React, { Dispatch, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../styles/BookNow.css';
import { CalendarSelectionProps } from './baseComponentProps';


export const CalendarSelection = ({ dateRangePoint, isModing, range, setShowCalendar, setRange }: CalendarSelectionProps) => {
    const isStart = dateRangePoint === 'Begin';
    const today = new Date();
    const dateRangeUse = isStart ? range.from : range.to;

    // todo if at the end of the month open up the next month
    let monthStart: Date;
    if (isStart && isModing) {
        monthStart = dateRangeUse as Date;
    } else if (isStart && !isModing) {
        monthStart = today
    } else {
        monthStart = range.from as Date;
    }
    // todo change all from and to in ranges to Begin and Conclude or begin and conclude to avoid all these checks maybe
    const [selected, setSelected] = useState<Date | undefined>(dateRangeUse as Date);

    const handleConfirm = () => {
        let updatedRange = range;
        const updateDate = isStart ? 'from' : 'to'
        updatedRange[updateDate] = selected;
        setRange(updatedRange)
        setShowCalendar(false)
    }

    let footer = <p>Select {isStart ? 'Beginning' : 'Conclusion' } of stay.</p>;
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
