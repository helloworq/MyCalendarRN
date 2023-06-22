import React, { Component, useState } from 'react';
import { Button, TextInput, PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import { loadData, getData } from './util/FileUtil'

var path = RNFS.ExternalDirectoryPath + '/MyData/'

function getCurrentYMD() {
    const d = new Date();
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()
}

function getCurrentTime() {
    const d = new Date();
    return d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds()
}


const MyRWMoment = () => {
    const [text, onChangeText] = useState()

    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <TextInput maxLength={400} multiline={true} onChangeText={text => onChangeText(text)} value={text} />

            <Button onPress={() => { console.log(path) }} title='上传图片' />

            <Button onPress={() => {

                const zone = 8
                const d = new Date();
                const f = (d.getHours() + 8).toString().padStart(2, '0') + "-"
                    + (d.getMinutes()).toString().padStart(2, '0') + "-"
                    + (d.getSeconds()).toString().padStart(2, '0')
                console.log(f)

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