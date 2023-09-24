import React, { useState, useEffect, useContext } from 'react';
import { Calendar } from 'react-native-calendars'
import {
  View,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import dayjs from 'dayjs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { PreferencesContext } from "./MyPreferencesContext";
import Timeline from 'react-native-timeline-flatlist'
import storage, { loadMomentByStroage, getMarkedDatesByStroage, getTagsByStroage } from './storage/MhkvStroge';
import ImgStroage from "./storage/ImgStroage";
import MyModalPicker from "./compoment/MyModalPicker";
import { selectAllMomentDates, selectCurMomentInfo } from './storage/repository/MomentDao';
import { Consumer } from 'react-native-paper/lib/typescript/src/core/settings';
import { findAllTag } from './storage/repository/TagDao';

const MyCalendar = ({ navigation }) => {
  const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
  const [markedDates, setMarkedDates] = useState()
  const [tags, setTags] = useState([])
  const [selectTag, setSelectTag] = useState()
  const [data, setData] = useState()

  const styles = StyleSheet.create({
    imageBg: {
      flex: 1,
      backgroundColor: theme.colors.totalOpacityBgColor,
    },
    //calendar
    calendarTheme: {
      dayTextColor: theme.colors.fontColor,
      monthTextColor: theme.colors.fontColor,
      calendarBackground: 'rgba(255,255,255,0)', //日期的背景色
      textSectionTitleColor: theme.colors.fontColor,
    },
    calendar: {
      margin: 10,
      shadowRadius: 20,
      borderRadius: 20,
      backgroundColor: theme.colors.bgColor
    },

    //timeline
    timeline: {
      flex: 1,
      padding: 30,
      margin: 10,
      flexDirection: 'row',
      backgroundColor: theme.colors.bgColor,
      borderRadius: 20,
    },
    timelineInfo: {
      flexDirection: 'row', marginRight: 50,
    },
    timelineInfoText: {
      marginLeft: 10,
      color: theme.colors.fontColor
    },
    timelineImg: {
      width: 50, height: 50,
    },
    timelineTime: {
      textAlign: 'center',
      backgroundColor: theme.colors.timelineTimeBgColor,
      color: theme.colors.fontColor,
      padding: 5,
      borderRadius: 5,
    },
  })

  function loadMoment(param, tag) {
    let r = loadMomentByStroage(param, tag)
    setData(r)
  }

  function loadMarkedDatesByStroage(tag) {
    let res = {}
    const dates = getMarkedDatesByStroage(tag)
    dates.forEach(e => res[e] = value)

    setMarkedDates(res)
  }

  useEffect(() => {
    selectAllMomentDates((e) => setMarkedDates(e))
    // const dates = getMarkedDatesByStroage()
    // console.log('aaaaaaaaa',dates)
    // dates.forEach(e => res[e] = value)
    // setMarkedDates(res)

    //tags
    findAllTag((e) => setTags(e))
    
    // const tagSaved = getTagsByStroage()
    // tagSaved.unshift(["#全部标签", 'tag', false])
    // setTags(tagSaved.map(e => e[0]))
  }, [])

  function renderDetail(rowData, sectionID, rowID) {
    var desc = null
    if (rowData['CONTENT'])
      desc = (
        <View style={styles.timelineInfo}>
          <Image source={{ uri: JSON.parse(rowData['IMAGES'])[0] }} style={styles.timelineImg} />
          <Text style={styles.timelineInfoText}>{rowData['CONTENT']}</Text>
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
        source={ImgStroage[bgImg]}
        resizeMode='stretch'
        style={styles.imageBg}>
        <ScrollView>
          <Calendar
            renderHeader={(date) => {
              //加上一个tag选择框，根据tag过滤
              const element = (
                <>
                  <View>
                    <View>
                      <Text style={{ color: theme.colors.fontColor, fontSize: 18, fontWeight: 'bold' }}>{dayjs(date).format('YYYY  MM  DD')}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <MyModalPicker
                        fontBgColor={theme.colors.bgColor}
                        fontColor={theme.colors.fontColor}
                        data={tags}
                        callback={(val) => {
                          loadMarkedDatesByStroage(val)
                          setSelectTag(val)
                        }}
                      />
                    </View>
                  </View>
                </>
              )
              return element
            }}
            renderArrow={(direction) => direction === 'left'
              ? <FontAwesome name={"arrow-left"} color={theme.colors.fontColor} size={20} />
              : <FontAwesome name={"arrow-right"} color={theme.colors.fontColor} size={20} />}
            theme={styles.calendarTheme}
            hideExtraDays={true}
            style={styles.calendar}
            onDayPress={(day) => {
              const param = day.year + '-' + day.month.toString().padStart(2, '0') + '-' + day.day.toString().padStart(2, '0')
              selectCurMomentInfo(param, (e) => setData(e))
            }}
            markedDates={markedDates}
          />

          <Timeline
            style={styles.timeline}
            data={data}
            circleColor={theme.colors.timelineCircleColor}
            separator={false}
            innerCircle={'none'}
            lineColor={theme.colors.timelineLineColor}
            timeStyle={styles.timelineTime}
            renderDetail={renderDetail}
          />
        </ScrollView>
      </ImageBackground>
    </>
  )
}

export default MyCalendar