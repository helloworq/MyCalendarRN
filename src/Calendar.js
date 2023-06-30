import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars'
import { View } from "react-native";
import { loadMonthFolders } from './util/FileUtil'

const MyCalendar = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState()
  const value = { selected: true, marked: true, selectedColor: 'green' }

  useEffect(() => {
    loadMonthFolders()
      .then((r) => {
        let res = {}
        r.forEach((e) => {
          const subIndex = e.lastIndexOf('/')
          const date = e.slice(subIndex + 1)
          res[date] = value
        })
        setMarkedDates(res)
      })
  }, [])


  return (
    <>
      <View style={{ backgroundColor: '#ffffe5' }}>
        <Calendar
          style={{ backgroundColor: '#ffffe5' }}
          onDayPress={day => {
            navigation.navigate('MyDynamicListView', {
              'param': day.year + '-' + day.month.toString().padStart(2, '0') + '-' + day.day.toString().padStart(2, '0')
            })
          }}
          markedDates={markedDates}
        />
      </View>
    </>
  )
}

export default MyCalendar