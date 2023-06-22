import React, { Component, useState } from 'react';
import { Button, TextInput, PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import { loadData, getData, removeData } from './util/FileUtil'

var path = RNFS.ExternalDirectoryPath + '/MyData/'

function getCurrentYMD() {
    const d = new Date();
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
}

function getCurrentTime() {
    const d = new Date();
    return d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds()
}
//  获取指定指定时区时间（北京时区为8，纽约时区为-5。东时区为正数，西市区为负数）
function getTimeByZone(timezone = 8, date) {
    // 本地时间距离（GMT时间）毫秒数
    let nowDate = !date ? new Date().getTime() : new Date(date).getTime()
    // 本地时间和格林威治时间差，单位分钟
    let offset_GMT = new Date().getTimezoneOffset()
    //  反推到格林尼治时间
    let GMT = nowDate + offset_GMT * 60 * 1000
    //  获取指定时区时间
    let targetDate = new Date(GMT + timezone * 60 * 60 * 1000)
    return targetDate
}

const MyRWMoment = () => {
    const [text, onChangeText] = useState()

    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <TextInput maxLength={400} multiline={true} onChangeText={text => onChangeText(text)} value={text} />

            <Button onPress={() => { console.log(path) }} title='上传图片' />

            <Button onPress={() => {

                //removeData('2023-06-22', '14-14-32')


                // RNFS.readdir(path).then((r) => console.log(r))
                // RNFS.mkdir(getCurrentYMD)
                // RNFS.mkdir(getCurrentTime)

                //loadData('2023-5-3')
                // function receiver(r){
                //     console.log(r)
                // }

                // const a = RNFS.readFile('/data/user/0/com.mycalendar/files/MyData/2023-5-3/2-16-58/data.json')
                // .then((t) => receiver(t))

                // RNFS.copyFile(
                //     'file:///storage/emulated/0/DCIM/Camera/IMG_20230620_120941.jpg',
                //     'file:///data/user/0/com.mycalendar/files/MyData/2023-5-2/14-56-32/IMG_20230620_120941.jpg'  )
                //     .then((success) => { console.log('已追加写入\n') })
                //     .catch((err => { console.log(err.message) }))


            }} title='发表' />

            <Button onPress={() => {
                RNFS.writeFile(path + '/data.json', text + '\n')
                    .then((success) => { console.log('已写入\n') })
                    .catch((err => { console.log(err.message) }))
            }} title='write' />

            <Button onPress={() => {
                RNFS.readFile(path + '/data.json')
                    .then((success) => { console.log('读取内容=>', success) })
                    .catch((err => { console.log(err.message) }))
            }} title='read' />

            <Button onPress={() => {
                RNFS.appendFile(path + '/data.json', text + '\n')
                    .then((success) => { console.log('已追加写入\n') })
                    .catch((err => { console.log(err.message) }))
            }} title='append' />
        </>
    )
}

export default MyRWMoment