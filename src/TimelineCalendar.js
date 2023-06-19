import React, { Component, useState } from 'react';
import { Alert } from 'react-native';
import MyDynamicListView from './MyDynamicListView';

import {
    ExpandableCalendar,
    TimelineEventProps,
    TimelineList,
    CalendarProvider,
    TimelineProps,
    CalendarUtils
} from 'react-native-calendars';
const today = new Date()
const getDate = (offset = 0) =>  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

const TimelineCalendar = () => {
    const [currentDate, setCurrentDate] = useState(getDate())

    const onDateChanged = (date) => { setCurrentDate(date) };

    const marked = {
        [`${getDate(-1)}`]: { marked: true },
        [`${getDate()}`]: { marked: true },
        [`${getDate(1)}`]: { marked: true },
        [`${getDate(2)}`]: { marked: true },
        [`${getDate(4)}`]: { marked: true }
    };

    return (
        <CalendarProvider
          date={currentDate}
          onDateChanged={onDateChanged}
          showTodayButton
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            firstDay={1}
            leftArrowImageSource={require('../img/1.png')}
            rightArrowImageSource={require('../img/2.png')}
            markedDates={marked}
          />
          <MyDynamicListView />
        </CalendarProvider>
      );
}

export default TimelineCalendar