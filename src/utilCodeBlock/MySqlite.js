import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { execInitSql } from '../storage/repository/BaseDao';
import {
    selectAllUser,
    selectCurUserInfo,
    updateUserInfo,
    selectCurUserMoment
} from '../storage/repository/UserDao';
import RNFS from 'react-native-fs'

const MySqlite = () => {

    return (
        <>
            <View style={{ marginTop: 10 }}>
                <Button onPress={() => {
                    execInitSql()
                }} title="初始化" />
                <Button onPress={() => {
                    selectAllUser()
                }} title="查看全部用户" />
                <Button onPress={() => {
                    selectCurUserInfo()
                }} title="查看当前用户" />
                <Button onPress={() => {
                    selectCurUserMoment()
                }} title="查询用户动态" />
                <Button onPress={() => {
                    const base = RNFS.ExternalDirectoryPath + '/region.sql'
                    let start = 0
                    let length = 10000000  //10mb


                    RNFS.read(base, length, start).then(e => {
                        RNFS.read(base, length, length).then((e2) => {
                            RNFS.read(base, length, length * 2).then((e3) => {
                                RNFS.read(base, length, length * 3).then((e4) => {
                                    let json = e + e2 + e3 + e4
                                    let tArray = json.split(';')//3589

                                    for (var i = 0; i < tArray.length; i++) {
                                        
                                        
                                    }
                                })
                            })
                        })
                    })
                }} title="读取大文件" />
            </View>
        </>
    )
}

export default MySqlite