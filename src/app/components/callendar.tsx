import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { callendar_theme } from '../../styles/callendar_theme';

export function Callendar(){
    const [selected, setSelected] = useState('');
    return (
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
          style={callendar_theme}
        />
      );
}