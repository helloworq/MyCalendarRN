import React, { Component, useState } from 'react';
import { Button, TextInput, PermissionsAndroid, ToastAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'
import {
    loadData,
    momentTagStatistics,
    getData, removeData, loadFolder, loadTags, writeTags, writeTags4Me
} from '../util/FileUtil'

var path = RNFS.ExternalDirectoryPath + '/MyData/'

const MyRWMoment = () => {
    const [text, onChangeText] = useState()

    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <TextInput maxLength={400} multiline={true} onChangeText={text => onChangeText(text)} value={text} />

            <Button onPress={() => { console.log(path) }} title='上传图片' />

            <Button onPress={() => {


               
console.log(dayjs().year())



                // new Promise(resolve => {
                //     console.log('P1 resolve')
                //     resolve()
                // }).then(async () => {
                //     console.log('P1 then 1')
                //     // P2
                //     return new Promise(resolve => {
                //         console.log('P2 resolve')
                //         resolve()
                //     }).then(() => {
                //         console.log('P2 then 1')
                //     }).then(() => {
                //         console.log('P2 then 2')
                //     })
                // }).then(() => {
                //     console.log('P1 then 2')
                // })



            }} title='发表' />
        </>
    )
}

export default MyRWMoment