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
import {
    selectAllMoment,
    selectCurMomentInfo,
    saveMoment,
    updateMoment,
} from '../storage/repository/MomentDao';

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
            </View>
        </>
    )
}

export default MySqlite