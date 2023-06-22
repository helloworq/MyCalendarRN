import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars'

const MyCalendar = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  return (
    <>
      <Agenda
        onDayPress={day => {
          setSelected(day.dateString)

          navigation.navigate('MyDynamicListView', {
            'param': day.year + '-' + day.month + '-' + day.day
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


{/* <Agenda

// the list of items that have to be displayed in agenda. If you want to render item as empty date

// the value of date key kas to be an empty array []. If there exists no value for date key it is

// considered that the date in question is not yet loaded

items={

  {
    '2012-05-22': [{ text: 'item 1 - any js object' }],

    '2012-05-23': [{ text: 'item 2 - any js object' }],

    '2012-05-24': [],

    '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],

  }}

// callback that gets called when items for a certain month should be loaded (month became visible)

loadItemsForMonth={(month) => { console.log('trigger items loading') }}

// callback that gets called on day press

onDayPress={(day) => { console.log('day pressed') }}

// callback that gets called when day changes while scrolling agenda list

onDayChange={(day) => { console.log('day changed') }}

// initially selected day

selected={'2012-05-16'}

// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

minDate={'2012-05-10'}

// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined

maxDate={'2012-05-30'}

// Max amount of months allowed to scroll to the past. Default = 50

pastScrollRange={50}

// Max amount of months allowed to scroll to the future. Default = 50

futureScrollRange={50}

// specify how each item should be rendered in agenda

renderItem={(item, firstItemInDay) => { return (<View />); }}

// specify how each date should be rendered. day can be undefined if the item is not first in that day.

renderDay={(day, item) => { return (<View />); }}

// specify how empty date content with no items should be rendered

renderEmptyDate={() => { return (<View />); }}

// specify how agenda knob should look like

renderKnob={() => { return (<View />); }}

// specify your item comparison function for increased performance

rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}

// Hide knob button. Default = false

hideKnob={true}

// By default, agenda dates are marked if they have at least one item, but you can override this if needed

markedDates={{

  '2012-05-16': { selected: true, marked: true },

  '2012-05-17': { marked: true },

  '2012-05-18': { disabled: true }

}}

// agenda theme

theme={{

  agendaDayTextColor: 'yellow',

  agendaDayNumColor: 'green',

  agendaTodayColor: 'red',

  agendaKnobColor: 'blue'

}}

// agenda container style

style={{}}

/> */}