import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../styles/BookNow.css';
import { CalendarSelectionProps } from './baseComponentProps';
import styled from 'styled-components';


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
      footer = 
        <CalendarFooter>
            <CalendarButton onClick={handleConfirm}>{dateRangePoint} stay on {format(selected, 'PP')}</CalendarButton>
        </CalendarFooter>;
    }
    // todo here or in parent - handle click outside to close, escape to close
    return (
        <CalendarModal>
            <CalendarCentering>
                <CalendarButton onClick={() => setShowCalendar(false)}>Close</CalendarButton>      
                <DayPicker
                    disabled={{ before: today }}
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                    defaultMonth={monthStart}
                />
            </CalendarCentering>
        </CalendarModal>
    );
};

const CalendarFooter = styled.p`
    color: rgb(55, 35, 4);
    font-size: 23px;
`;

const CalendarModal = styled.div`
    position: fixed; // Stay in place
    z-index: 1; // Sit on top
    left: 0;
    top: 0;
    width: 100%; // Full width
    height: 100%; // Full height
    overflow: auto; // Enable scroll if needed
    background-color: rgb(0,0,0); // Fallback color
    background-color: rgba(104, 78, 50, 0.764); // Black w/ opacity
`;

const CalendarCentering = styled.div`
    margin-top: 10%;
`;

const CalendarButton = styled.button`
    background-color: pink;
    font-size: 25px;
    border: none;
    padding: 10px;
    cursor: pointer;
`;
