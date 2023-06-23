import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars'

const MyCalendar = ({ navigation }) => {
  return (
    <>
      <Agenda
        onDayPress={day => {
          navigation.navigate('MyDynamicListView', {
            'param': day.year + '-' + day.month.toString().padStart(2, '0') + '-' + day.day.toString().padStart(2, '0')
          })
        }}
        markedDates={{
          '2023-03-01': { selected: true, marked: true, selectedColor: 'blue' },
          '2023-03-02': { marked: true },
          '2023-03-03': { selected: true, marked: true, selectedColor: 'blue' }
        }}
      />
    </>
  )
}

export default MyCalendar