import React, { Component, useState } from 'react';
import { Button, TextInput } from 'react-native'
import RNFS from 'react-native-fs'

var path = RNFS.DocumentDirectoryPath

const MyRWMoment = () => {
    const [text, onChangeText] = useState()

    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <TextInput maxLength={400} multiline={true} onChangeText={text => onChangeText(text)} value={text} />

            <Button onPress={() => { console.log(path) }} title='上传图片' />

            <Button onPress={() => { console.log(path) }} title='发表' />

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