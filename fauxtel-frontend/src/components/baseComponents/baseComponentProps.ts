import { Dispatch, MouseEventHandler } from "react";
import { Matcher } from "react-day-picker";

export interface BaseButtonProps {
    displayText: string;
    type: 'submit' | 'reset' | 'button' | undefined;
    className: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export interface CalendarSelectionProps {
    dateRangePoint: 'Begin' | 'Conclude';
    isModing: boolean;
    range: Range;
    setShowCalendar: Dispatch<boolean>;
    setRange: Dispatch<Range>;
}

export interface Range {
    from: Matcher | Matcher[] | undefined;
    to: Matcher | Matcher[] | undefined;
}

export interface DateSelectionProps {
    dateSelected: Date;
    dateRangePoint: 'Begin' | 'Conclude';
    setShowCalendar: Dispatch<boolean>;
    showCalendar: boolean;
}

export interface InputFieldProps {
    displayText: string;
    type: 'text' | 'password' | 'number' | undefined;
    className?: string;
    name?: string;
    // onClick?: MouseEventHandler<HTMLButtonElement>;
    placeholder?: string;
    value?: string | undefined;
};