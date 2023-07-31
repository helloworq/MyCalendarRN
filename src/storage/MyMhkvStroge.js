import React, { useState } from "react"
import { Button } from "react-native"
import storage from "./MhkvStroge"

const MyMhkvStroge = () => {

    const user = {
        theme: 'dark',
    }
    const tag = {
        tag: 'check',//default tag
        select: false,
        name: 'name',
    }
    const moment = {
        time: "15:56:07",
        date: "2023-06-28",
        datetime: "2023-06-28 15:56:07",
        moment: "1111",
        tags: [
            [
                "#上班打卡",
                "alarm-check",
                true
            ]
        ]
    }

    return (
        <>
            <Button title='保存tag' onPress={() => {
                storage.set('tag', JSON.stringify(tag))
            }} />
            <Button title='读取tag' onPress={() => {
                console.log(storage.getString('tag'))
            }} />
            <Button title='读取all key' onPress={() => {
                console.log(storage.getAllKeys())
            }} />
            <Button title='保存动态' onPress={() => {
                storage.set('moment', JSON.stringify(moment))
            }} />
            <Button title='读取动态' onPress={() => {
               console.log(storage.getString('moment'))
            }} />
            <Button title='清除动态' onPress={() => {
                storage.delete('moment')
            }} />
        </>
    )
}

export default MyMhkvStroge