import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars'
import RNFS from 'react-native-fs'
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { loadMonthFolders,loadData } from './util/FileUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import dayjs from 'dayjs';
import { MD3LightTheme as DefaultTheme, Text } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist'

const MyCalendar = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState()
  const value = { selected: true, marked: true, selectedColor: '#66ff66' }
  const [data, setData] = useState()
  function loadMoment(param) {
    loadData(param).then((r) => {
      let count = 0
      for (let i = 0; i < r.length; i++) {
        RNFS.readFile(r[i]['dataPath'])
          .then((t) => {
            t = JSON.parse(t)
            r[i]['description'] = t.moment
            r[i]['tags'] = t.tags
            count = count + 1
            if (count === r.length) {
              setData(r)
            }
          })
      }
    })
  }

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

  function renderDetail(rowData, sectionID, rowID) {
    var desc = null

    if (rowData.description)
      desc = (
        <View style={styles.timelineInfo}>
          <Image source={{ uri: rowData?.imageUrl[0] }} style={styles.timelineImg} />
          <Text style={styles.timelineInfoText}>{rowData?.description}</Text>
        </View>
      )

    return (
      <>
        <TouchableOpacity style={{ marginBottom: 35 }}
          onPress={() => {
            navigation.navigate('MyMomentViewer', {
              'param': rowData,
            })
          }}
        >
          <View style={{ flex: 1 }}>
            {desc}
          </View>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <ImageBackground
        source={require('./utilCodeBlock/layout/bg.jpeg')}
        resizeMode='stretch'
        style={styles.imageBg}>
        <ScrollView>
          <Calendar
            renderArrow={(direction) => direction === 'left'
              ? <FontAwesome name={"arrow-left"} color={colorsDark.calendarArrowColor} size={20} />
              : <FontAwesome name={"arrow-right"} color={colorsDark.calendarArrowColor} size={20} />}
            monthFormat={'yyyy / MM / dd'}
            theme={styles.calendarTheme}
            style={styles.calendar}

            onDayPress={(day)=>{
              const param = day.year + '-' + day.month.toString().padStart(2, '0') + '-' + day.day.toString().padStart(2, '0')
              loadMoment(param)
            }}

            // onDayPress={day => {
            //   navigation.navigate('MyDynamicListView', {
            //     'param': day.year + '-' + day.month.toString().padStart(2, '0') + '-' + day.day.toString().padStart(2, '0')
            //   })
            // }}
            markedDates={markedDates}
          />

          <Timeline
            style={styles.timeline}
            data={data}
            circleColor={colorsDark.timelineCircleColor}
            separator={false}
            innerCircle={'none'}
            lineColor={colorsDark.timelineLineColor}
            timeStyle={styles.timelineTime}
            renderDetail={renderDetail}
          />
        </ScrollView>
      </ImageBackground>
    </>
  )
}

const colorsDark = {
  //calendar
  calendarArrowColor: 'white',
  calendarMonthTextColor: 'white',
  calendarDayTextColor: 'white',
  calendarDayDisableTextColor: 'gray',
  calendarAgendaDayTextColor: 'white',
  calendarBgColor: 'black',
  calendarDayBgColor: 'rgba(255,255,255,0.1)',

  //timeline
  timelineBgColor: 'rgba(0,0,0,1)',
  timelineCircleColor: 'gray',
  timelineLineColor: '#bebebe',
  timelineTimeBgColor: 'rgba(255,255,255,0.1)',
  timelineTimeTextColor: 'white',
  timelineInfoTextColor: 'white'
  //timeline: '',
}

const colorsLight = {
  //calendar
  calendarArrowColor: 'white',
  calendarMonthTextColor: 'white',
  calendarDayTextColor: 'white',
  calendarDayDisableTextColor: 'gray',
  calendarAgendaDayTextColor: 'white',
  calendarBgColor: 'black',
  calendarDayBgColor: 'rgba(255,255,255,0.1)',

  //timeline
  timelineBgColor: 'rgba(255,255,255,0.5)',
  timelineCircleColor: '#bebebe',
  timelineLineColor: '#bebebe',
  timelineTimeBgColor: 'rgba(0,0,255,0.1)',
  timelineTimeTextColor: 'black',
  timelineInfoTextColor: 'black'
  //timeline: '',
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1, padding: 10
  },
  //calendar
  calendarTheme: {
    textDisabledColor: colorsDark.calendarDayDisableTextColor,
    dayTextColor: colorsDark.calendarDayTextColor,
    agendaDayTextColor: colorsDark.calendarAgendaDayTextColor,
    monthTextColor: colorsDark.calendarMonthTextColor,
    calendarBackground: colorsDark.calendarDayBgColor,
  },
  calendar: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: colorsDark.calendarBgColor
  },

  //timeline
  timeline: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: colorsDark.timelineBgColor,
    borderRadius: 20,
  },
  timelineInfo: {
    flexDirection: 'row', marginRight: 50
  },
  timelineInfoText: {
    marginLeft: 10,
    color: colorsDark.timelineInfoTextColor
  },
  timelineImg: {
    width: 50, height: 50,
  },
  timelineTime: {
    textAlign: 'center',
    backgroundColor: colorsDark.timelineTimeBgColor,
    color: colorsDark.timelineTimeTextColor,
    padding: 5,
    borderRadius: 5,
  },
})


export default MyCalendar