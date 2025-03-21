import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { calendarTheme } from '../../styles/callendarTheme';

export function Callendar({ onDayPress }) {
    const [selected, setSelected] = useState('');

    return (
        <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
                if (onDayPress) {
                    onDayPress(day);
                }
            }}
            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
            }}
            style={calendarTheme}
        />
    );
}
