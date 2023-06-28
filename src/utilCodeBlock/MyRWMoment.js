import React, { Component, useState } from 'react';
import { Button, TextInput, PermissionsAndroid, ToastAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import { loadData, getData, removeData,loadFolder,loadTags,writeTags, writeTags4Me } from '../util/FileUtil'

var path = RNFS.ExternalDirectoryPath + '/MyData/'

const MyRWMoment = () => {
    const [text, onChangeText] = useState()

    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <TextInput maxLength={400} multiline={true} onChangeText={text => onChangeText(text)} value={text} />

            <Button onPress={() => { console.log(path) }} title='上传图片' />

            <Button onPress={() => {



            }} title='发表' />
        </>
    )
}

export default MyRWMoment