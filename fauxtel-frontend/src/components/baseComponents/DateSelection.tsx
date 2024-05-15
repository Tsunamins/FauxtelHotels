import styled from 'styled-components';
import { day, month } from '../../constants';
import '../../styles/BookNow.css';
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


// todo these will need to maybe work a bit different
const DateSelectedBox = styled.div`
    border: 1px solid #f2d2c2;
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
`;

const DateSelectionBox = styled.div`
    border: 1px solid #f2d2c2;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;